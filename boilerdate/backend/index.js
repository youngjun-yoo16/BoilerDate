require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const CodeModel = require("./models/Code");
const {
  generateVerificationCode,
  sendVerificationEmail,
} = require("./verification_code");

const app = express();
app.use(express.json());
app.use(cors());

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
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/signup2", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
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

app.post("/sendverificationcode", async (req, res) => {
  try {
    // Get email
    const { email } = req.body;
    const code = generateVerificationCode();

    await CodeModel.create({ email: email, verificationCode: code });

    const sendEmail = sendVerificationEmail(email, code);

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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
