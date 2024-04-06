require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const CodeModel = require("./models/Code");
const ProfileModel = require("./models/Profile");
const ImageModel = require("./models/Image");
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
const BlockModel = require("./models/BlockReport");
const PdfModel = require("./models/PdfFile");
const UserFeedbackModel = require("./models/Feedback");
const IssueModel = require("./models/Issue");

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

app.post("/fetchUser", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await ProfileModel.findOne({ email: email });
    const emails = [user.email];

    const filteredUsersPromises = emails.map(async (email) => {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const dateDiff = Date.now() - new Date(user.dob).getTime();
        const objAge = new Date(dateDiff);
        const convertedAge = Math.abs(objAge.getUTCFullYear() - 1970);
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
      return null;
    });

    let filteredUsers = await Promise.all(filteredUsersPromises);
    filteredUsers = filteredUsers.filter((user) => user); // Remove nulls

    const filteredUserProfilesByPrivacySettings =
      await filterUsersByPrivacySettings(filteredUsers);

    console.log(filteredUserProfilesByPrivacySettings);
    res.json(filteredUserProfilesByPrivacySettings);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.json({ error: "Failed to fetch user data" });
  }
});

app.post("/deleteAccount", async (req, res) => {
  try {
    const { email } = req.body;

    // Execute all deletion operations in parallel
    await Promise.all([
      UserModel.deleteOne({ email }),
      ProfileModel.deleteOne({ email }),
      FilterModel.deleteOne({ email }),
      PrivacyModel.deleteOne({ email }),
      UserLDMModel.deleteOne({ email }),
      NotificationModel.deleteOne({ email }),
      ImageModel.deleteOne({ email }),
      BlockModel.deleteOne({ email }),
      PdfModel.deleteOne({ email }),
    ]);

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

    await PrivacyModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          gpa: gpa,
          major: major,
          degree: degree,
          interests: interests,
          lifestyle: lifestyle,
          height: height,
          personality: personality,
          relationship: relationship,
          citizenship: citizenship,
          skills: skills,
          employment: employment,
          career: career,
          github: github,
          linkedin: linkedin,
        },
      },
      { upsert: true, new: true }
    )
      .then((setupinfo) => res.json(setupinfo))
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const { email, text, rating } = req.body;
    console.log(email);

    // find the previous feedback submitted of the user
    const originalFeedback = await UserFeedbackModel.findOne({ email: email });

    // without removing the original feedback, it appends to the previous one
    let updatedFeedback = text;
    if (originalFeedback) {
      updatedFeedback = originalFeedback.feedback + "\n\n" + text;
    }

    // rating is updated
    const newFeedback = await UserFeedbackModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          email: email,
          rating: rating,
          feedback: updatedFeedback,
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json(newFeedback);
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

    // Fetch like and match status in one go
    const userStatus = await NotificationModel.findOne(
      { email: emailToSend },
      { like: 1, match: 1, _id: 0 }
    );

    // Determine if an email should be sent based on the type and the respective status
    const shouldSendEmail =
      (type === "like" && userStatus.like) ||
      (type === "match" && userStatus.match);

    if (shouldSendEmail) {
      const sendEmailResult = await sendNotificationEmail(emailToSend, type);
      if (sendEmailResult) {
        return res.json({ success: true, message: "Sent email successfully!" });
      }
    }

    // If email wasn't sent, respond with failure message
    res.json({ success: false, message: "Failed to send notification email" });
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
  await ImageModel.findOneAndUpdate({ email: req.body.email }, obj, {
    upsert: true,
    new: true,
  })
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
      console.log("Image File deleted");
    }
  });
});

app.get("/image/:email", async (req, res) => {
  try {
    const img = await ImageModel.findOne({ email: req.params.email });
    if (!img || !img.img.data) {
      return res.status(404).send();
    }

    res.contentType(img.img.contentType);
    res.send(img.img.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("GET image failed");
  }
});

app.post("/uploadPDFfile", upload.single("pdfFile"), async (req, res) => {
  // define temporary filepath
  temp_pdf_file_path = path.join(__dirname, "/uploads/", req.file.filename);

  // define object to upload
  try {
    await PdfModel.findOneAndDelete({ email: req.body.email });

    const obj = {
      name: req.file.filename,
      email: req.body.email,
      pdfFile: {
        data: fs.readFileSync(temp_pdf_file_path),
        contentType: "application/pdf",
      },
    };

    // insert pdf file to mongodb and return success true
    await PdfModel.create(obj)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "pdf file upload completed",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  } catch (error) {
    console.error(error);
  }

  // delete uploaded file in temp folder
  fs.unlink(temp_pdf_file_path, (err) => {
    if (err) {
      if (err.code == "ENOENT") {
        console.error("No such file exists.");
      } else {
        throw err;
      }
    } else {
      console.log("PDF File deleted");
    }
  });
});

app.get("/significant/:email", async (req, res) => {
  try {
    // search for the pdf file with given email
    const pdf = await PdfModel.findOne({ email: req.params.email });
    if (!pdf || !pdf.pdfFile.data) {
      return res.status(404).send();
    }

    // send back, prompting user to download the file
    res.setHeader("Content-Disposition", "attachment; filename=" + pdf.name);
    res.contentType("application/pdf");
    res.send(pdf.pdfFile.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("GET pdfFile failed");
  }
});

app.get("/checkPdfExists/:email", async (req, res) => {
  try {
    const pdf = await PdfModel.findOne({ email: req.params.email });
    if (pdf && pdf.pdfFile && pdf.pdfFile.data) {
      // simply confirm if the pdf file exists or not
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
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

      const updateReceivedLikes = await UserLDMModel.updateOne(
        { email: target },
        { $addToSet: { "receivedlikes.emails": email } }
      );

      if (isMatch) {
        const type = "match";

        const targetInfo = await UserModel.findOne({ email: target });
        const userInfo = await UserModel.findOne({ email: email });

        const targetData = {
          username: targetInfo.firstName + "_" + targetInfo.lastName,
          secret: targetInfo.firstName,
          email: target,
          first_name: targetInfo.firstName,
          last_name: targetInfo.lastName,
        };

        const myData = {
          username: userInfo.firstName + "_" + userInfo.lastName,
          secret: userInfo.firstName,
          email: email,
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
        };

        const usersConfig = {
          method: "get",
          url: `https://api.chatengine.io/users/`,
          headers: {
            "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
          },
        };

        let isUserExists = false;
        let isTargetExists = false;

        await axios(usersConfig).then((response) => {
          //map response data and check if the user exists
          //if exists, set boolean to true
          const users = response.data;
          //console.log(users);
          users.map((user) => {
            if (user.email === email) {
              isUserExists = true;
            }
            if (user.email === target) {
              isTargetExists = true;
            }
          });
        })
        ;

        // If user does not exist, create a new user
        if (!isUserExists) {
          const myConfig = {
            method: "post",
            url: "https://api.chatengine.io/users/",
            headers: {
              "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
            },
            data: myData,
          };
          axios(myConfig)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
              res.status(400).json({
                message: "An error occurred",
                error: error.toString(),
              });
            });
        }

        // If target does not exist, create a new user
        if (!isTargetExists) {
          const targetConfig = {
            method: "post",
            url: "https://api.chatengine.io/users/",
            headers: {
              "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
            },
            data: targetData,
          };
          axios(targetConfig)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
              res.status(400).json({
                message: "An error occurred",
                error: error.toString(),
              });
            });
        }

        // Delete the matched user from liked & received liked pages
        await deleteUsersFromLikedWhenMatched(email, target);
        await deleteUsersFromLikedWhenMatched(target, email);

        // Fetch like and match status for both users in parallel
        const [userStatus, targetStatus] = await Promise.all([
          NotificationModel.findOne({ email: email }, { match: 1, _id: 0 }),
          NotificationModel.findOne({ email: target }, { match: 1, _id: 0 }),
        ]);

        // Determine if an email should be sent to each user based on the match status
        const shouldSendEmailToUser = userStatus && userStatus.match;
        const shouldSendEmailToTarget = targetStatus && targetStatus.match;

        // Send email to the user if their match status is true
        if (shouldSendEmailToUser) {
          await sendNotificationEmail(email, type);
        }

        // Send email to the target if their match status is true
        if (shouldSendEmailToTarget) {
          await sendNotificationEmail(target, type);
        }

        // update the current user
        await UserLDMModel.updateOne(
          { email: email },
          { $addToSet: { "matches.emails": target } }
        );

        // update the matched user
        await UserLDMModel.updateOne(
          { email: target },
          { $addToSet: { "matches.emails": email } }
        );

        // TODO: if dislike, remove from match and add to dislike
      }
    }

    // send back
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to trigger the Axios request
app.post("/create-user", (req, res) => {
  const { matchedUserData } = req.body;

  // Axios config
  const config = {
    method: "post",
    url: "https://api.chatengine.io/users/",
    headers: {
      "PRIVATE-KEY": "{{2cf88b7a-e935-438e-8fef-5b51503c737a}}",
    },
    data: matchedUserData,
  };

  // Making the Axios request
  axios(config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred", error: error.toString() });
    });
});

app.post("/fetchlikes", async (req, res) => {
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

app.post("/fetchblocks", async (req, res) => {
  try {
    const { email } = req.body;
    const document = await BlockModel.findOne({ email: email }, "blocks");

    if (document) {
      res.json(document.blocks);
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error("Failed to fetch blocks:", error);
    res.status(500).json({ error: "Failed to fetch blocks" });
  }
});

app.post("/fetchusernames", async (req, res) => {
  try {
    const { emails } = req.body;
    const usernames = await UserModel.find({ email: { $in: emails } });
    const profiles = await ProfileModel.find({ email: { $in: emails } });
    let userData = {};
    usernames.forEach((user) => {
      // doing another search
      const profile = profiles.find((profile) => profile.email === user.email);
      const username = `${user.firstName} ${user.lastName}`;
      const dob = user.dob;
      const dateDiff = Date.now() - new Date(dob).getTime();
      const objAge = new Date(dateDiff);
      const convertedAge = Math.abs(objAge.getUTCFullYear() - 1970);
      userData[username] = {
        email: user.email,
        gpa: profile.gpa,
        age: convertedAge,
      };
    });
    res.json(userData);
  } catch (error) {
    console.error("Error fetching the username and gpa ", error);
    res.json({ error: "Failed to fetch username and gpa from db" });
  }
});

app.post("/deleteUnmatched", async (req, res) => {
  try {
    const { email, emailToRemove } = req.body;

    // First operation: Remove emailToRemove from email's document
    const result1 = await UserLDMModel.updateOne(
      { email: email },
      { $pull: { "matches.emails": emailToRemove } }
    );

    // Second operation: Remove email from emailToRemove's document
    const result2 = await UserLDMModel.updateOne(
      { email: emailToRemove },
      { $pull: { "matches.emails": email } }
    );

    // Check the results to see if the documents were found (matched)
    if (result1.matchedCount > 0 && result2.matchedCount > 0) {
      console.log("Both documents found:", result1, result2);
      res
        .status(200)
        .json({ message: "Unmatched users removed successfully." });
    } else if (result1.matchedCount > 0 || result2.matchedCount > 0) {
      // Partial success: Only one of the documents was found
      console.log(
        "Partial update. One of the documents may not have been matched."
      );
      res.status(207).json({
        message:
          "Partial success. One of the documents may not have been matched.",
      });
    } else {
      // No documents were matched
      console.log("No documents matched the criteria.");
      res.status(404).json({
        message: "No documents matched the criteria.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/block", async (req, res) => {
  try {
    const { email, target } = req.body;

    await BlockModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { "blocks.emails": target } },
      { upsert: true }
    );

    const targetArray = [target];
    const emailArray = [email];

    await filterUsersByBlockedAndReported(email, targetArray);
    await filterUsersByBlockedAndReported(target, emailArray);

    console.log("email: " + email + " | target: " + target);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/report", async (req, res) => {
  try {
    const { email, target, reason } = req.body;

    await BlockModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { "reports.emails": target, "reports.reasonings": reason } },
      { upsert: true }
    );

    const targetArray = [target];
    const emailArray = [email];

    await filterUsersByBlockedAndReported(email, targetArray);
    await filterUsersByBlockedAndReported(target, emailArray);

    console.log("email: " + email + " | target: " + target);
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
    let filteredPotentialMatches = potentialMatches.filter(
      (potentialMatch) => potentialMatch.email !== email
    );

    // Filter out already matched users
    const matchedUsers = await UserLDMModel.findOne(
      { email: email },
      { "matches.emails": 1, _id: 0 }
    );

    // Use optional chaining and provide a default empty array if null
    const matchedUsersEmails = matchedUsers?.matches.emails || [];

    // Step 2: Filter the potential matches further based on the GPA range
    let emailsMatchingGPA;
    if (fp.gpa) {
      emailsMatchingGPA = filteredPotentialMatches
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
    } else {
      emailsMatchingGPA = filteredPotentialMatches.map((doc) => doc.email);
    }

    // Filter out emails of already matched users
    emailsMatchingGPA = emailsMatchingGPA.filter(
      (email) => !matchedUsersEmails.includes(email)
    );

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

    // Step 4: Filter out blocked users
    const blockedUsers = await BlockModel.findOne({ email: email });
    //console.log(blockedUsers);
    if (blockedUsers) {
      //console.log("blocked users exist");

      const blockedEmails = blockedUsers.blocks;
      let blocks = [];
      for (let index = 0; index < blockedEmails.emails.length; index++) {
        const element = blockedEmails.emails[index];
        blocks.push(element);
      }
      const reportedEmails = blockedUsers.reports;
      console.log("blocked users: " + blocks);
      for (let index = 0; index < reportedEmails.emails.length; index++) {
        const element = reportedEmails.emails[index];
        blocks.push(element);
      }
      console.log("blocked + reported users: " + blocks);

      let finalFilter = [];
      for (let index = 0; index < filteredUsers.length; index++) {
        const element = filteredUsers[index].email;
        if (blocks.includes(element)) {
          console.log("removed");
        } else {
          finalFilter.push(filteredUsers[index]);
        }
      }

      // Further filter user profiles that haven't blocked or reported me
      const filteredProfiles = await filterProfilesByBlockedAndReported(
        finalFilter,
        email
      );

      // Delete my email from blocked & reported users' like/dislike/matches model
      await filterUsersByBlockedAndReported(email, blocks);

      const filteredUserProfilesByPrivacySettings =
        await filterUsersByPrivacySettings(filteredProfiles);

      res.json(filteredUserProfilesByPrivacySettings);
    } else {
      // Further filter user profiles that haven't blocked or reported me
      const filteredProfiles = await filterProfilesByBlockedAndReported(
        filteredUsers,
        email
      );
      const filteredUserProfilesByPrivacySettings =
        await filterUsersByPrivacySettings(filteredProfiles);

      res.json(filteredUserProfilesByPrivacySettings);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function filterProfilesByBlockedAndReported(userProfiles, myEmail) {
  const filteredProfiles = [];

  for (const profile of userProfiles) {
    const blockEntry = await BlockModel.findOne({ email: profile.email });

    if (blockEntry) {
      const isBlocked = blockEntry.blocks.emails.includes(myEmail);
      const isReported = blockEntry.reports.emails.includes(myEmail);

      if (!isBlocked && !isReported) {
        // If myEmail is not found in the blocks or reports, add the profile to the result
        filteredProfiles.push(profile);
      }
    } else {
      // If there's no block entry for the profile, it means they haven't blocked or reported anyone, so include them
      filteredProfiles.push(profile);
    }
  }

  return filteredProfiles;
}

async function deleteUsersFromLikedWhenMatched(email, target) {
  await UserLDMModel.findOneAndUpdate(
    { email: email },
    {
      $pull: {
        "liked.emails": target,
        "receivedlikes.emails": target,
      },
    },
    { new: true }
  );
}

async function filterUsersByBlockedAndReported(email, users) {
  if (users == null) {
    return;
  }

  // Looping through emails of blocked + reported users
  for (const userEmail of users) {
    console.log(userEmail);
    // Use the $pull operator to directly remove the email from the arrays
    await UserLDMModel.findOneAndUpdate(
      { email: userEmail }, // Assuming userEmail is the email of the user document to update
      {
        $pull: {
          "disliked.emails": email,
          "liked.emails": email,
          "matches.emails": email,
          "receivedlikes.emails": email,
        },
      },
      { new: true }
    );
  }
}

async function filterUsersByPrivacySettings(users) {
  const filteredProfiles = [];
  for (const user of users) {
    // Fetch privacy settings for the current user
    const privacySettings = await PrivacyModel.findOne({
      email: user.email,
    }).lean();
    const filteredUser = {};

    // If privacy settings exist, filter the user's info based on these settings
    if (privacySettings) {
      for (const key of Object.keys(user)) {
        // If the key exists in privacy settings
        if (privacySettings.hasOwnProperty(key)) {
          // Include the field with its original value if set to 'yes', or null if set to 'no'
          filteredUser[key] = privacySettings[key] === "no" ? null : user[key];
        } else {
          // If the privacy setting for a key is not defined, retain the original value
          if (key === "employment_history") {
            filteredUser[key] =
              privacySettings["employment"] === "no" ? null : user[key];
          } else if (key === "career_goals") {
            filteredUser[key] =
              privacySettings["career"] === "no" ? null : user[key];
          } else {
            filteredUser[key] = user[key];
          }
        }
      }
    } else {
      // If no privacy settings found, include the user's full profile without modification
      for (const key of Object.keys(user)) {
        filteredUser[key] = user[key];
      }
    }
    filteredProfiles.push(filteredUser);
  }
  return filteredProfiles;
}

app.post("/issues", async (req, res) => {
  const { email, issue } = await req.body;
  //console.log(email + ": " + issue);
  try {
    await IssueModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { issue: issue } },
      { upsert: true, new: true }
    )
      .then(() => {
        console.log("issue reported");
        res.status(200).json({
          success: true,
          message: "issue reported",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
