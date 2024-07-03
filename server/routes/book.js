const express = require('express');
const router = express.Router();
const cookieparser = require('cookie-parser');
router.use(cookieparser());

const book = require('../schemas/booking');
const Place = require('../schemas/place');

router.get('/booking/:id',(req,res)=>{
    const placeid = req.params.id;
    Place.findOne({ id: placeid})
    .then(place=>{
        if(place) res.status(200).json(place)
        else res.status(400).json({stat:"Not found"})
    })
})

router.get('/book/:id', (req, res) => {
    const placeid = req.params.id;
    Place.findOne({ id: placeid})
    .then(place=>{
        if(place) res.status(200).json(place)
        else res.status(401).json({stat:"Not found"})
    })
})

router.post('/booking/:id',async (req,res)=>{
    const id=Date.now()+""+Math.floor(Math.random()*10);
    const placeid=req.params.id;
    const username=req.body.username;
    const fromdate=req.body.fromDate;
    const todate=req.body.toDate;
    const paymentDone=req.body.paymentDone;
    const numberOfpassengers=req.body.numberOfpassengers;
    const passengers=req.body.passengers;
    const place = await Place.findOne({ id: placeid});
    const newBooking=new book({
        id:id,
        username:username,
        fromdate:fromdate,
        todate:todate,
        paymentDone:paymentDone,
        numberOfpassengers:numberOfpassengers,
        passengers:passengers,
        placedetails:place
    })
    const bookings = await book.find({fromdate:fromdate});
    if((bookings.length + newBooking.numberOfpassengers)>30){
        res.status(400).json({stat:`Sorry, only ${30-bookings.length} seats are available for the selected date`})
    }
    newBooking.save().then(book=>{
        res.status(200).json(id)
    })
})

module.exports = router;