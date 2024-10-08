const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");
router.use(cookieparser());
const client = require("../utils/Redis");

const User = require("../schemas/user");
const Place = require("../schemas/place");
const Review = require("../schemas/reviews");
const Book = require("../schemas/booking");

router.get("/places/:id", async (req, res) => {
  const category = req.params.id;
  const cachedData = await client.get(category);
  if (cachedData) {
    res.send(JSON.parse(cachedData));
  } else {
    if (category === "all") {
      const cacheDataPlaces = await client.get("places");
      if (cacheDataPlaces) {
        res.send(JSON.parse(cacheDataPlaces));
      } else {
        await Place.find({}, (err, data) => {
          if (err) res.status(201).json({ error: "some error incurred." });
          else {
            client.set("places", JSON.stringify(data));
            res.status(200).json(data);
          }
        });
      }
    } else if (category) {
      await Place.find({ category: category }, async (err, data) => {
        if (err) res.status(201).json({ error: "some error incurred." });
        else {
          await client.set(category, JSON.stringify(data));
          res.status(200).json(data);
        }
      });
    } else res.status(201).json({ error: "some error incurred." });
  }
});

router.get("/placedetails/:id", async (req, res) => {
  const placeid = req.params.id;
  const place = await Place.findOne({ id: placeid }).populate({
    path: "reviews",
    populate: { path: "user" },
  });
  if (place) res.status(200).json(place);
  else res.status(201).json({ error: "Some error incurred." });
});

router.post("/review", async (req, res) => {
  const username = req.body.username;
  const bookid = req.body.bookid;
  const user = await User.findOne({ username: username });
  const rating = req.body.rating;
  const review = req.body.review;
  if (user) {
    Book.findOne({ id: bookid })
      .populate("placedetails")
      .exec((err, booking) => {
        if (err) console.error(err);
        else {
          const place = booking.placedetails;
          const new_review = new Review({
            user: user,
            place: place,
            rating: rating,
            review: review,
          });
          new_review.save(async (err, newReview) => {
            if (err) console.error(err);
            else {
              const reviews = await Review.find({ place: place });
              let newRating = 0;
              if (reviews.length > 0) {
                newRating =
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length;
              }
              place.reviews.push(newReview._id);
              place.rating = newRating;
              await place.save();
              user.tourReviews.push(newReview._id);
              await user.save();
              await Book.findOneAndUpdate(
                { id: bookid },
                { reviewGiven: true },
                (err, data) => {
                  if (err) console.error(err);
                  else {
                    res.status(200).json({ msg: "Review added successfully." });
                  }
                }
              );
            }
          });
        }
      });
  } else res.status(201).json({ msg: "User not found." });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  Book.findOneAndDelete({ id: id }, (err, data) => {
    if (err) res.status(201).json({ error: "some error incurred." });
    else res.status(200).json({ msg: "Booking deleted successfully." });
  });
});

module.exports = router;
