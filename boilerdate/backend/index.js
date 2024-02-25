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
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.post("/signup", (req, res) => {
  /*UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));*/
});

app.post("/signup2", (req, res) => {
  //const { email, firstName, lastName, gender, dob } = req.body;

  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));

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

app.post("/additionalInfo", (req, res) => {
  ProfileModel.create(req.body)
    .then((setupinfo) => res.json(setupinfo))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("Account does not exist");
    }
  });
});

app.post("/updatepassword", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      UserModel.updateOne({ email: email, password: password }).then((res) => {
        console.log(res);
      });
    } else {
      res.json("Account does not exist");
    }
  });
});

app.post("/verify", (req, res) => {
  const { code } = req.body;
  CodeModel.findOne({ verificationCode: code }).then((code) => {
    if (code) {
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

    await CodeModel.create({ email: email, verificationCode: code });

    const sendEmail = await sendVerificationEmail(email, code);

    if (sendEmail) {
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
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      // Date(Date.now()).toString() must be done to see the actual timestamp translated
    );
  },
});

const upload = multer({ storage: storage });

// retrieve all image docs from mongodb
/*app.get("/uploadPhoto", (req, res) => {
  imageSchema.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    // fix this later; should render in a way to display a photo
    res.render("/uploadPhoto", { items: data });
  });
});
*/

app.post("/uploadPhoto", upload.single("image"), async (req, res) => {
  //console.log(req.file.filename);
  const obj = {
    name: req.file.filename,
    img: {
      data: fs.readFileSync(
        // no problem here
        path.join(__dirname, "/uploads/", req.file.filename)
      ),
      //contentType: "image/png",
      contentType: req.file.mimetype,
    },
  };

  await imageModel
    .create(obj)
    .then((item) => {
      // The document was created successfully
      res.status(200).json({
        success: true,
        message: "Photo upload done",
        //redirectTo: "/interests",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
