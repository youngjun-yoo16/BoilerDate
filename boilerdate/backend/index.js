require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const CodeModel = require("./models/Code");
const ProfileModel = require("./models/Profile");
const imageModel = require("./models/Image");

const UserLDModel = require("./models/UserLD");
const { HandleUserLikesAndDisklikes } = require("./HandleLikesDislikes");

const {
  generateVerificationCode,
  sendVerificationEmail,
  verifyEmail,
} = require("./verification_code");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FilterModel = require("./models/Filter");

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
    .then((item) => {
      res.status(200).json({
        success: true,
        message: "Photo upload done",
      });
    })
    .catch((err) => {
      console.log(err);
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
app.post("/manageLD", async (req, res) => {
  try {
    const { email, target, lod } = req.body;
    updateObject = {};
    if (lod) {
      // append email to liked array
      updateObject = { $addToSet: { "liked.emails": target } };
    } else {
      updateObject = { $addToSet: { "disliked.emails": target } };
    }

    // update or insert
    const user = await UserLDModel.findOneAndUpdate(
      { email: email },
      updateObject,
      // return modified one else create one
      { new: true, upsert: true }
    );
    res.json(result);
  } catch (error) {
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

app.post("/filter", async (req, res) => {
  try {
    const {
      email,
      gpa,
      age,
      major,
      degree,
      interests,
      lifestyle,
      lowerHeight,
      upperHeight,
      personality,
      relationship,
      citizenship,
    } = req.body;

    // Step 1: Filter profileInfos collection
    const filteredEmails = await ProfileModel.find({
      gpa: gpa,
      major: major,
      degree: degree,
      interests: { $all: interests },
      lifestyle: { $all: lifestyle },
      height: { $gt: lowerHeight, $lt: upperHeight },
      personality: personality,
      relationship: relationship,
      citizenship: citizenship,
    }).select("email -_id"); // Select only the email field; disregard _id field

    const emails = filteredEmails.map((doc) => doc.email);

    // Step 2: For each email, find the corresponding user in the profile collection, calculate age.
    // If the age is within the range, insert user profile into filteredUsers array
    // Use Promise.all to wait for all async operations to complete
    const filteredUsersPromises = emails.map(async (email) => {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const dateDiff = Date.now() - new Date(user.dob).getTime();
        const objAge = new Date(dateDiff);
        const convertedAge = Math.abs(objAge.getUTCFullYear() - 1970);
        if (convertedAge >= Number(age[0]) && convertedAge <= Number(age[1])) {
          return ProfileModel.findOne({ email: email }); // Return the promise
        }
      }
    });

    const filteredUsersResults = await Promise.all(filteredUsersPromises);
    const filteredUsers = filteredUsersResults.filter(
      (user) => user !== undefined
    );

    // Step 3: Upsert filter preferences in FilterModel
    await FilterModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          filter_preferences: {
            gpa: gpa,
            age: age,
            major: major,
            degree: degree,
            interests: interests,
            lifestyle: lifestyle,
            height: [lowerHeight, upperHeight],
            personality: personality,
            relationship: relationship,
            citizenship: citizenship,
          },
        },
      },
      { upsert: true, new: true }
    );

    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
