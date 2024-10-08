const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

const TokenVerifier = require("./TokenVerifier");
const User = require("../schemas/user");
const OTP = require("../schemas/otp");

router.use(cookieparser());

// Login Page
router.get("/loguser/:id", TokenVerifier, async (req, res) => {
  try {
    if (req.user.msg) {
      return res.status(401).json({ msg: req.user.msg });
    }
    if (!req.user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const inname = req.params.id;
    const user = await User.findOne({ username: inname })
      .populate("givenfeedback")
      .exec();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
      imagegiven: user.imagegiven,
      gender: user.gender,
      name: user.name,
      phonenumber: user.phonenumber,
      feedbackgiven: user.feedbackgiven,
      givenfeedback: user.givenfeedback,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/loguser", TokenVerifier, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const email = req.user.id;
    const user = await User.findOne({ email: email })
      .populate("givenfeedback")
      .exec();

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
      imagegiven: user.imagegiven,
      feedbackgiven: user.feedbackgiven,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login handle
router.post("/login", async (req, res) => {
  try {
    const inname = req.body.username;
    const inpassword = req.body.password;
    const user = await User.findOne({ username: inname });

    if (user && (await bcrypt.compare(inpassword, user.password))) {
      const data = {
        username: user.username,
        role: user.role,
      };
      const token = jwt.sign({ id: user.email }, process.env.TOKEN, {
        expiresIn: "1d",
      });
      res.status(200).json({ user: data, token: token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Register handle
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({ username: username });
    const user1 = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ msg: "Username already exists" });
    } else if (user1) {
      return res.status(409).json({ msg: "Email already exists" });
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
        role: role,
        imagegiven: false,
        feedbackgiven: false,
        registered: true,
      });

      await newUser.save();
      const data = {
        username: newUser.username,
        role: newUser.role,
      };
      const token = jwt.sign({ id: newUser.email }, process.env.TOKEN, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({ msg: "Registered Successfully", user: data, token: token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Generate OTP
router.post("/generateOTP", async (req, res) => {
  try {
    const { email, keyword } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    if (keyword === "forgotpassword") {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ msg: "User doesn't exist" });
      }
    } else if (keyword === "register") {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(409).json({ msg: "User already exists" });
      }
    }

    await OTP.deleteMany({ email: email });

    const newOTP = new OTP({
      email: email,
      OTP: otp,
      OTPTime: Date.now(),
      keyword: keyword,
    });

    await transporter.sendMail(message);
    await newOTP.save();

    res.status(200).json({ msg: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Verify OTP
router.post("/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpEntry = await OTP.findOne({ email: email });

    if (!otpEntry) {
      return res.status(401).json({ msg: "Invalid OTP" });
    }

    if (otpEntry.OTP === otp && otpEntry.OTPTime + 5 * 60 * 1000 > Date.now()) {
      await OTP.deleteOne({ _id: otpEntry._id });
      res.status(200).json({ keyword: otpEntry.keyword });
    } else {
      res.status(401).json({ msg: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Forgot password
router.post("/forgotpassword", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashPassword }
    );

    if (!user) {
      return res.status(404).json({ msg: "Invalid Email" });
    }

    const data = {
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign({ id: user.email }, process.env.TOKEN, {
      expiresIn: "1d",
    });

    res.status(200).json({
      msg: "Password changed successfully",
      user: data,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
