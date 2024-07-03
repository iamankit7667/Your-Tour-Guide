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

//login Page
router.get("/loguser/:id", TokenVerifier, async (req, res) => {
  if(req.user.msg) res.status(201).json({msg:req.user.msg});
  if (!req.user) res.status(201).json({msg:"Invalid credentials"});
  else {
    const inname = req.params.id;
    const user = await User.findOne({ username: inname })
      .populate("givenfeedback")
      .exec();
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
  }
});

router.get("/loguser",TokenVerifier, async (req, res) => {
  if (!req.user) res.status(201).json({msg:"Invalid credentials"});
  else {
    const email = req.user.id;
    const user = await User.findOne({ email: email })
      .populate("givenfeedback")
      .exec();
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
  }
});

//  login handle
router.post("/login", async (req, res) => {
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
    res.status(201).json({ error: "User doesn't exist." });
  }
});

//register handle
router.post("/register", async (req, res) => {
  const inname = req.body.username;
  const inemail = req.body.email;
  const inpass1 = req.body.password;
  const role = req.body.role;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(inpass1, salt);
  const user = await User.findOne({ username: inname });
  const user1 = await User.findOne({ email: inemail });
  if (user) {
    res.status(201).json({ msg: "username already exists" });
  } else if (user1) {
    res.status(201).json({ msg: "Email already exists" });
  } else {
    const newUser = new User({
      id: req.body.id,
      username: inname,
      email: inemail,
      password: hashPassword,
      role: role,
      imagegiven: false,
      feedbackgiven: false,
      registered: true,
    });
    try {
      await newUser.save().then(async (user) => {
        const data = {
          username: user.username,
          role: user.role,
        };
        const token = jwt.sign({ id: user.email }, process.env.TOKEN, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .json({ msg: "Registered Successfully", user: data, token: token });
      });
    } catch (err) {
      res.status(404).json("token not created");
    }
  }
});

router.post("/generateOTP", async (req, res) => {
  const email = req.body.email;
  const keyword = req.body.keyword;
  const otp = Math.floor(100000 + Math.random() * 900000) + "";
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "officialpackurbags@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: "officialpackurbags@gmail.com",
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  if (keyword === "forgotpassword") {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.status(201).json({ msg: "User doesn't exist" });
      }
    });
  } else if (keyword === "register") {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.status(201).json({ msg: "User already exists" });
      }
    });
  }
  const newOTP = new OTP({
    email: email,
    OTP: otp,
    OTPTime: Date.now(),
    keyword: keyword,
  });
  OTP.find({ email: email }).then((otp) => {
    if (otp.length > 0) {
      OTP.deleteMany({ email: email }, (err) => {
        if (err) {
          res.status(500).json({ msg: "Error deleting OTP" });
        }
      });
    }
    transporter.sendMail(message, (error, info) => {
      if (error) {
        res.status(500).json({ msg: "Error sending OTP" });
      }
    });
    newOTP.save().then((otp) => {
      res.status(200).json({ msg: "OTP sent to your mail" });
    });
  });
});

router.post("/verify", async (req, res) => {
  const email = req.body.email;
  const givenotp = req.body.otp + "";
  OTP.findOne({ email: email }).then((otp) => {
    if (!otp) {
      res.status(201).json({ msg: "Invalid OTP" });
    } else if (
      otp.OTP === givenotp &&
      otp.OTPTime + 5 * 60 * 1000 > Date.now()
    ) {
      OTP.deleteOne({ _id: otp._id }, (err) => {
        if (err) {
          res.status(500).json({ msg: "Error deleting OTP" });
        } else {
          res.status(200).json({ keyword: otp.keyword });
        }
      });
    } else {
      res.status(201).json({ msg: "Invalid OTP" });
    }
  });
});

router.post("/forgotpassword", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  User.findOneAndUpdate({ email: email }, { password: hashPassword }).then(
    (user) => {
      if (!user) {
        res.status(201).json({ msg: "Invalid Email" });
      } else {
        const data = {
          username: user.username,
          role: user.role,
        };
        const token = jwt.sign({ id: user.email }, process.env.TOKEN, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .json({
            msg: "Password changed successfully",
            user: data,
            token: token,
          });
      }
    }
  );
});

module.exports = router;
