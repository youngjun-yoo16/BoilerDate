require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const CodeModel = require("./models/Code");
const ProfileModel = require("./models/Profile");
const imageModel = require("./models/Image");
const UserLDMModel = require("./models/UserLDM");
const FilterModel = require("./models/Filter");
const {
  generateVerificationCode,
  sendVerificationEmail,
  verifyEmail,
} = require("./verification_code");
const { sendNotificationEmail } = require("./send_notification_email");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const NotificationModel = require("./models/Notification");
const PrivacyModel = require("./models/Privacy");

const app = express();
app.use(express.json());
app.use(cors());

// allows to parse url encoded data and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
console.log("Connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.post("/signup", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/signup2", (req, res) => {
  //const { email, firstName, lastName, gender, dob } = req.body;
  /*UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));*/
  /*UserModel.findOne({ email: email }).then((user) => {
    console.log(user);
    if (user) {
      //UserModel.findOneAndDelete({ email: email });
      UserModel.create(req.body);
      res.json("User created");
    } else {
      res.json("Could not find user");
    }
  });*/
});

app.post("/completeProfile", (req, res) => {
  ProfileModel.create(req.body)
    .then((setupinfo) => res.json(setupinfo))
    .catch((err) => res.json(err));
});

app.post("/fetchProfile", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    const profile = await ProfileModel.findOne({ email: email });
    const responseData = { user: user, profile: profile };
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.json({ error: "Failed to fetch profile data" });
  }
});

app.post("/deleteAccount", async (req, res) => {
  try {
    const { email } = req.body;
    await UserModel.deleteOne({ email: email });
    await ProfileModel.deleteOne({ email: email });
    await FilterModel.deleteOne({ email: email });
    await UserLDMModel.deleteOne({ email: email });
    res.status(200).json({
      message: "Account and all associated data successfully deleted.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/privacy", async (req, res) => {
  try {
    const {
      email,
      gpa,
      major,
      degree,
      interests,
      lifestyle,
      height,
      personality,
      relationship,
      citizenship,
      skills,
      employment,
      career,
      github,
      linkedin,
    } = req.body;
    console.log(email);

    await PrivacyModel.findOne({ email: email }).then((privacy) => {
      if (privacy) {
        PrivacyModel.deleteOne({ email: email });
        /*PrivacyModel.deleteOne({ email: email }).then((result) => {
          console.log(result);
        });*/
        console.log("privacy deleted");
      } else {
        console.log("privacy does not exist");
      }
    });

    await PrivacyModel.create(req.body)
      .then((setupinfo) => res.json(setupinfo))
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (atob(user.password) === password) {
        res.json("Success");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("Account does not exist");
    }
  });
});

app.post("/updatepassword", async (req, res) => {
  try {
    const { email, encodedPassword } = req.body;
    const result = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: encodedPassword } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/verify", async (req, res) => {
  const { tempCode } = req.body;
  try {
    const result = await CodeModel.findOne({ verificationCode: tempCode });

    if (result) {
      res.json("Verification Success!");
      await CodeModel.findOneAndDelete({ verificationCode: tempCode });
    } else {
      res.json("Verification Failed");
    }
  } catch (error) {
    console.error("Error during verification or deletion:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/verifyemail", async (req, res) => {
  try {
    const { email } = req.body;
    const validEmail = await verifyEmail(email);
    // Not a valid Purdue email address
    if (!validEmail) {
      res.json("FAIL: user not found in the directory");
    } else {
      const user = await UserModel.findOne({ email: email });
      // User account already exists
      if (user) {
        res.json("Verification Success!");
        // User account doesn't exist
      } else {
        res.json("Verification Failed");
      }
    }
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.post("/sendverificationcode", async (req, res) => {
  try {
    // Get email
    const { email } = req.body;
    const code = generateVerificationCode();

    const sendEmail = await sendVerificationEmail(email, code);

    if (sendEmail) {
      await CodeModel.create({ email: email, verificationCode: code });
      res.json({
        success: true,
        message: "Sent to database and email successfully!",
      });
    } else {
      res.json({
        success: false,
        message: "Failed to send verification code email",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/sendNotificationEmail", async (req, res) => {
  try {
    const { emailToSend, type } = req.body;
    const sendEmail = await sendNotificationEmail(emailToSend, type);
    if (sendEmail) {
      res.json({
        success: true,
        message: "Sent email successfully!",
      });
    } else {
      res.json({
        success: false,
        message: "Failed to send notification email",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "profile-" +
        file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
      // Date(Date.now()).toString() must be done to see the actual timestamp translated
    );
  },
});

// Sets the multer storage configuration to above.
const upload = multer({ storage: storage });

// Image retrieval can be done in frontend
app.post("/uploadPhoto", upload.single("image"), async (req, res) => {
  temp_image_file_path = path.join(__dirname, "/uploads/", req.file.filename);

  const obj = {
    name: req.file.filename,
    email: req.body.email,
    img: {
      data: fs.readFileSync(temp_image_file_path),
      //contentType: "image/png",
      contentType: req.file.mimetype,
    },
  };

  // insert photo to mongodb and return success true
  await imageModel
    .create(obj)
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Photo upload done",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
  // delete uploaded file
  fs.unlink(temp_image_file_path, (err) => {
    if (err) {
      if (err.code == "ENOENT") {
        console.error("No such file exists.");
      } else {
        throw err;
      }
    } else {
      console.log("File deleted");
    }
  });
});

app.get("/image/:email", async (req, res) => {
  try {
    const img = await imageModel.findOne({ email: req.params.email });
    if (!img || !img.img.data) {
      return res.status(404).send();
    }
    //console.log(img.img.data);

    res.contentType(img.img.contentType);
    res.send(img.img.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error?");
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// liked dislike endpoint; only store data to db and returns nothing
app.post("/manageldm", async (req, res) => {
  try {
    const { email, target, lod } = req.body;

    await UserLDMModel.updateOne(
      { email: email },
      { $pull: { "liked.emails": target, "disliked.emails": target } }
    );

    // either liked or disliked
    const flag = lod ? "liked.emails" : "disliked.emails";

    // finally create doc
    const updatedUser = await UserLDMModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { [flag]: target } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    console.log("email: " + email + " | like: " + lod + " | target: " + target);

    // whenever liked, search if the target also liked him. add to matches
    if (lod) {
      const isMatch = await UserLDMModel.findOne({
        email: target,
        "liked.emails": email,
      });
      if (isMatch) {
        const type = "match";
        console.log("match found");
        await sendNotificationEmail(email, type);
        await sendNotificationEmail(target, type);
        // update the current user
        await UserLDMModel.updateOne(
          { email: email },
          { $addToSet: { matches: target } }
        );

        // update the matched user
        await UserLDMModel.updateOne(
          { email: email },
          { $addToSet: { matches: email } }
        );
      }
    }

    // send back
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/fetchLikes", async (req, res) => {
  try {
    const { email } = req.body;
    const likesList = await UserLDMModel.findOne({ email: email });
    res.json(likesList);
    console.log("list of likes for this user is sent");
  } catch (error) {
    console.error("Error fetching the list of likes:", error);
    res.json({ error: "Failed to fetch likes" });
  }
});

app.post("/fetchusernames", async (req, res) => {
  try {
    const { emails } = req.body;
    const usernames = await UserModel.find({ email: { $in: emails } });
    const profiles = await ProfileModel.find({ email: { $in: emails } });
    let userData = {};
    usernames.forEach((user) => {
      const profile = profiles.find((profile) => profile.email === user.email);
      const username = `${user.firstName} ${user.lastName}`;
      userData[username] = {
        email: user.email,
        gpa: profile.gpa,
      };
    });
    // send back
    res.json(userData);
  } catch (error) {
    console.error("Error fetching the username and gpa ", error);
    res.json({ error: "Failed to fetch username and gpa from db" });
  }
});

app.post("/deleteUnmatched", async (req, res) => {
  try {
    const { email, emailToRemove } = req.body;
    const result = await UserLDMModel.updateOne(
      { email: email },
      { $pull: { "matches.emails": emailToRemove } }
    );

    // Check the result to see if the document was found and updated
    if (result.nModified > 0) {
      console.log("Document updated successfully:", result);
      res.status(200).json({ message: "Unmatched user removed successfully." });
    } else {
      // No documents were modified: The email was not found in the matches or the user does not exist
      console.log(
        "No changes made. The user may not exist or the email was not found in matches."
      );
      res.status(404).json({
        message: "No changes made. User not found or match email not in list.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateGPA", async (req, res) => {
  try {
    const { email, gpa } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { gpa: gpa } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateMajor", async (req, res) => {
  try {
    const { email, major } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { major: major } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateDegree", async (req, res) => {
  try {
    const { email, degree } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { degree: degree } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateHeight", async (req, res) => {
  try {
    const { email, height } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { height: height } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updatePersonality", async (req, res) => {
  try {
    const { email, personality } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { personality: personality } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateRelationship", async (req, res) => {
  try {
    const { email, relationship } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { relationship: relationship } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateCitizenship", async (req, res) => {
  try {
    const { email, citizenship } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { citizenship: citizenship } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateSkills", async (req, res) => {
  try {
    const { email, skills } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { skills: skills } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateEmployment", async (req, res) => {
  try {
    const { email, employment_history } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { employment_history: employment_history } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateCareer", async (req, res) => {
  try {
    const { email, career_goals } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { career_goals: career_goals } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateGithub", async (req, res) => {
  try {
    const { email, github } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { github: github } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateLinkedin", async (req, res) => {
  try {
    const { email, linkedin } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { linkedin: linkedin } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateBio", async (req, res) => {
  try {
    const { email, bio } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { bio: bio } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateInterests", async (req, res) => {
  try {
    const { email, selectedInterests } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { interests: selectedInterests } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateLifestyle", async (req, res) => {
  try {
    const { email, selectedLifestyle } = req.body;
    const result = await ProfileModel.findOneAndUpdate(
      { email: email },
      { $set: { lifestyle: selectedLifestyle } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateName", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const result = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { firstName: firstName, lastName: lastName } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateGender", async (req, res) => {
  try {
    const { email, gender } = req.body;
    const result = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { gender: gender } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateBirthday", async (req, res) => {
  try {
    const { email, dob } = req.body;
    const result = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { dob: dob } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateNotificationSettings", async (req, res) => {
  try {
    const { email, likePf, matchPf } = req.body;
    const result = await NotificationModel.findOneAndUpdate(
      { email: email },
      { $set: { like: likePf, match: matchPf } },
      { upsert: true, new: true } // Ensure to return the updated document
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/updateFilterPreferences", async (req, res) => {
  try {
    const {
      email,
      gender,
      age,
      gpa,
      major,
      degree,
      interests,
      lifestyle,
      height,
      personality,
      relationship,
      citizenship,
    } = req.body;

    // Upsert filter preferences in FilterModel
    const updatedDocument = await FilterModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          filter_preferences: {
            gpa: gpa,
            gender: gender,
            age: age,
            major: major,
            degree: degree,
            interests: interests,
            lifestyle: lifestyle,
            height: height,
            personality: personality,
            relationship: relationship,
            citizenship: citizenship,
          },
        },
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Filter preferences updated successfully.",
      updatedPreferences: updatedDocument.filter_preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/fetchFilteredUsers", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await FilterModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const fp = user.filter_preferences;
    // Dynamic query object (height will always be there)
    let query = {
      height: { $gte: fp.height[0], $lte: fp.height[1] },
    };

    // Handle empty strings or empty arrays
    if (fp.major) query.major = fp.major;
    if (fp.degree) query.degree = fp.degree;
    if (fp.interests && fp.interests.length)
      query.interests = { $all: fp.interests };
    if (fp.lifestyle && fp.lifestyle.length)
      query.lifestyle = { $all: fp.lifestyle };
    if (fp.personality) query.personality = fp.personality;
    if (fp.relationship) query.relationship = fp.relationship;
    if (fp.citizenship) query.citizenship = fp.citizenship;

    // Extract the lower and upper GPA from the provided string
    let inputLowerGPA, inputUpperGPA;
    if (fp.gpa.includes("-")) {
      [inputLowerGPA, inputUpperGPA] = fp.gpa.split("-").map(Number);
    } else {
      inputLowerGPA = null; // No lower bound
      inputUpperGPA = Number(fp.gpa.substring(1)); // Extract and convert the upper bound
    }

    // Step 1: Retrieve all potential matches based on dynamically constructed criteria
    const potentialMatches = await ProfileModel.find(query).select(
      "email gpa -_id"
    );

    // Filter out the user itself if included
    const filteredPotentialMatches = potentialMatches.filter(potentialMatch => potentialMatch.email !== email)

    // Step 2: Filter the potential matches further based on the GPA range
    const emailsMatchingGPA = filteredPotentialMatches
      .filter((doc) => {
        let storedLowerGPA, storedUpperGPA;
        if (doc.gpa.includes("-")) {
          [storedLowerGPA, storedUpperGPA] = doc.gpa.split("-").map(Number);
        } else {
          storedLowerGPA = storedUpperGPA = Number(doc.gpa.substring(1));
        }

        // Check overlap or upper bound conditions
        if (inputLowerGPA === null) {
          // If inputLowerGPA is null, we're dealing with a "<value" condition, so check if storedUpperGPA is less than inputUpperGPA
          return storedUpperGPA <= inputUpperGPA;
        } else {
          // If inputLowerGPA is not null, we're dealing with a range, so check if the ranges overlap
          return (
            inputLowerGPA <= storedLowerGPA && storedUpperGPA <= inputUpperGPA
          );
        }
      })
      .map((doc) => doc.email);

    // Step 3: For each email, find the corresponding user in the profile collection, calculate age, and check gender.
    // Use Promise.all to wait for all async operations to complete

    // Dynamic query object
    let userQuery = {};
    if (fp.gender) userQuery.gender = fp.gender;

    const filteredUsersPromises = emailsMatchingGPA.map(async (email) => {
      userQuery.email = email;
      const user = await UserModel.findOne(userQuery);
      if (user) {
        const dateDiff = Date.now() - new Date(user.dob).getTime();
        const objAge = new Date(dateDiff);
        const convertedAge = Math.abs(objAge.getUTCFullYear() - 1970);
        if (
          convertedAge >= fp.age[0] &&
          convertedAge <= fp.age[1] &&
          (fp.gender === "" || user.gender === fp.gender)
        ) {
          const profile = await ProfileModel.findOne({ email: email });
          if (profile) {
            return {
              ...profile.toObject(),
              age: convertedAge,
              firstName: user.firstName,
              lastName: user.lastName,
              imageUrl: `http://localhost:3001/image/${email}`,
            }; // Include the calculated age and name
          }
        }
      }
      return null;
    });

    let filteredUsers = await Promise.all(filteredUsersPromises);
    filteredUsers = filteredUsers.filter((user) => user); // Remove nulls

    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
