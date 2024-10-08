const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
router.use(cookieparser());
const url = require("url");
const multer = require("multer");
const path = require("path");
const cloudinaryconfig = require("../cloudconfig");
const client = require("../utils/Redis");

const book = require("../schemas/booking");
const User = require("../schemas/user");
const fdb = require("../schemas/feedback");
const Place = require("../schemas/place");

// Feedbacks display for admin
router.get("/feedbacks", async (req, res) => {
  await fdb
    .find()
    .sort({ createdAt: -1 })
    .populate("userDetails")
    .exec((err, feedbacks) => {
      if (err) {
        console.error(err);
        return;
      } else {
        res.status(200).json(feedbacks);
      }
    });
});

//get tours of username
router.get("/tours/:id", (req, res) => {
  let username = req.params.id;
  book.find({ username: username }, (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(201).json({ msg: "error occurred" });
    }
  });
});

// table data of users for admin
router.get("/users", (req, res) => {
  let role = url.parse(req.url, true).query.role;
  User.find({ role: role }, (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      console.log(err);
    }
  });
});

// to remove users by backend
router.delete("/delete/:id", async (req, res) => {
  let username = req.params.id;
  await User.findOneAndDelete({ username: username }, async (err, doc) => {
    await book.deleteMany({ username: username });
    await fdb.deleteOne({ username: username });
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ msg: `user deleted ${doc.username}` });
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/places");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      Date.now() +
        Math.floor(Math.random() * 10) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/place/:id", upload.single("photo"), async (req, res) => {
  if (!req.params.id) {
    res.status(201).json({ error: "error occurred" });
  } else {
    let username = req.params.id;
    const cloudinary_response = await cloudinaryconfig.v2.uploader
      .upload(req.file.path, {
        upload_preset: "Post2022",
      })
      .catch((err) => { 
        console.log(err);
        res.status(201).json({ error: "error uploading image." });
        return;
      });
    const newplace = new Place({
      id: req.body.id,
      from: req.body.from,
      to: req.body.to,
      photo: cloudinary_response.secure_url,
      price: req.body.price,
      details: req.body.details,
      category: req.body.category,
      reviews: [],
      availability: true,
      threeDay: JSON.parse(req.body.threeDay),
      fiveDay: JSON.parse(req.body.fiveDay),
    });
    await User.findOne({ username: username }).then(async (user) => {
      if (user.role === "admin" || user.role === "root") {
        const place = await Place.findOne({ id: newplace.id });
        if (place) {
          Place.findOneAndUpdate({ id: req.body.id }, newplace, (err, doc) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json({ msg: "place updated Successfully" });
            }
          });
        } else {
          newplace.save().then(() => {
            Place.find({}, (err, data) => {
              if (data) {
                client.set("places", JSON.stringify(data));
              } else {
                res.status(201).json({ msg: "error occurred" });
              }
            });
            Place.find({ category: req.body.category }, (err, data) => {
              if (data) {
                client.set(req.body.category, JSON.stringify(data));
              } else {
                res.status(201).json({ msg: "error occurred" });
              }
            });
            res.status(200).json({ success: "place added Successfully" });
          });
        }
      } else {
        res.status(201).json({ error: "error occurred" });
      }
    });
  }
});

router.get("/packages", (req, res) => {
  Place.find({}, (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(201).json({ msg: "error occurred" });
    }
  });
});

router.delete("/deleteplace/:id", async (req, res) => {
  let id = req.params.id;
  Place.findOneAndDelete({ id: id }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      Place.find({}, (err, data) => {
        if (data) {
          client.set("places", JSON.stringify(data));
        } else {
          res.status(201).json({ msg: "error occurred" });
        }
      });
      Place.find({ category: doc.category }, (err, data) => {
        if (data) {
          client.set(doc.category, JSON.stringify(data));
        } else {
          res.status(201).json({ msg: "error occurred" });
        }
      });
      res.status(200).json({ msg: `place deleted` });
    }
  });
});

router.put("/updateplace/:id", async (req, res) => {
  let id = req.params.id;
  Place.findOneAndUpdate({ id: id }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ msg: `place updated ${doc.id}` });
    }
  });
});

router.get("/place/:id", (req, res) => {
  let id = req.params.id;
  Place.findOne({ id: id }, (err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(201).json({ msg: "error occurred" });
    }
  });
});

module.exports = router;
