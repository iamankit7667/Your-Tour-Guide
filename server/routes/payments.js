const express = require("express");
const router = express.Router();
const Pay = require("../schemas/payment");
const Book = require("../schemas/booking");

router.get("/pay/:id", (req, res) => {
  let bookid = req.params.id;
  Book.findOne({ id: bookid })
    .populate("placedetails")
    .exec((err, bookings) => {
      if (err) res.status(201).json({ error: "Some error incurred." });
      else {
        res.status(200).json(bookings);
      }
    });
});

router.get("/mybookings/:id", async (req, res) => {
  let username = req.params.id;
  Book.find({ username: username, paymentDone: false })
    .populate("placedetails")
    .exec((err, bookings) => {
      if (err) res.status(201).json({ error: "Some error incurred." });
      else {
        res.status(200).json(bookings);
      }
    });
});

router.get("/bookings/:id", async (req, res) => {
  let bookid = req.params.id;
  try {
    const bookings = await Book.findOne({ id: bookid })
      .populate("placedetails")
      .exec();
    const det = {
      id: bookings.id,
      from: bookings.placedetails.from,
      to: bookings.placedetails.to,
      price: bookings.placedetails.price,
      days: bookings.placedetails.days,
      numberOfpassengers: bookings.numberOfpassengers,
      fromdate: bookings.fromdate,
      todate: bookings.todate,
      passengers: bookings.passengers,
    };
    res.status(200).json(det);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/updatePassengers/:id", async (req, res) => {
  let bookid = req.params.id;
  try {
    bookings = await Book.findOne({ id: bookid });
    Book.findOneAndUpdate(
      { id: bookid },
      { passengers: req.body.passengers, numberOfpassengers: req.body.passengers.length }
    ).then((book) => {
      res.status(200).json({ msg: "updated Successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/bookings/:id", async (req, res) => {
  let bookid = req.params.id;
  try {
    bookings = await Book.findOne({ id: bookid });
    Book.findOneAndUpdate(
      { id: bookid },
      {
        passengers: req.body.passengers,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
      }
    ).then((book) => {
      res.status(200).json({ msg: "updated Successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/pay/:id", (req, res) => {
  const bookid = req.params.id;
  let username = req.body.username;
  const num = req.body.number;
  const hold = req.body.holder;
  const mon = req.body.expmon;
  const year = req.body.expyear;
  const cvv = req.body.cvv;

  const newpe = new Pay({
    number: num,
    name: hold,
    expmonth: mon,
    expyear: year,
    cvv: cvv,
    name: req.body.name,
    bookid: bookid,
    timestamp: new Date(),
  });
  //save user
  newpe.save().then((pay) => {
    Book.findOneAndUpdate(
      { id: bookid },
      { paymentDone: true, paymentDetails: pay }
    ).then((book) => {
      res.status(200).json({ msg: "Payment Successful" });
    });
  });
});

router.get("/getTransactions/:id", async (req, res) => {
  let username = req.params.id;
  try {
    await Book.find({ username: username, paymentDone: true })
      .populate("placedetails")
      .populate("paymentDetails")
      .exec((err,bookings) => {
        res.status(200).json(bookings);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deleteBooking/:id", async (req, res) => {
  let bookid = req.params.id;
  const booking = await Book.findOne({ id: bookid }).populate("paymentDetails").exec();
  try {
    Book.findOneAndDelete({ id: bookid }).then((book) => {
      Pay.findOneAndDelete({ bookid: bookid }).then((pay) => {
        res.status(200).json({ msg: "Booking cancelled and your amount will be refunded" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
