require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const CodeModel = require("./models/Code");
const ProfileModel = require("./models/Profile");
const imageModel = require("./models/Image");
const {
  generateVerificationCode,
  sendVerificationEmail,
} = require("./verification_code");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

app.post("/verify", (req, res) => {
  const { tempCode } = req.body;
  console.log(tempCode);
  CodeModel.findOne({ verificationCode: tempCode }).then((tempCode) => {
    if (tempCode) {
      res.json("Verification Success!");
    } else {
      res.json("Verification Failed");
    }
  });
});

app.post("/verifyemail", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((email) => {
    if (email) {
      res.json("Verification Success!");
    } else {
      res.json("Verification Failed");
    }
  });
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

app.get("/image/:name", async (req, res) => {
  try {
    const img = await imageModel.findOne({ name: req.params.name });
    if (!img || !img.img.data) {
      return res.status(404).send();
    }
    console.log(img.img.data);

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
