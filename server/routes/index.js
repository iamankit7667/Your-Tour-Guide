const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const fdb = require("../schemas/feedback");

router.get("/fd", async (req, res) => {
  await fdb.find()
  .sort({ createdAt: -1 })
  .limit(4)
  .populate('userDetails')
  .exec((err, feedbacks) => {
    if (err) {
      console.error(err);
      return;
    } else{
      res.status(200).json(feedbacks);
    }
  });
});

router.post("/fd", async (req, res) => {
  const username = req.body.username;
  const det = req.body.fdbk;
  const user = await User.findOne({ username: username });
  const newfd = new fdb({
    feedback: det,
    userDetails: user,
  });
  if (user) {
    newfd.save().then(async (fd) => {
      await User.findOneAndUpdate(
        { username: username },
        { feedbackgiven:true,givenfeedback: fd },
        async (err, doc) => {
          if (err) res.status(201).json({ error: "Some error incurred." });
          else res.status(200).json({ succ: "feedback submitted successfully" });
        }
      );
    });
  }
});
module.exports = router;
