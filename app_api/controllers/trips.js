const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results of querery
    // on the console
    // console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip listß
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // Return single record
        .exec();

    // Uncomment the following line to show results of querery
    // on the console
    console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};



// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q) { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return new trip
        return res
            .status(201)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
    console.log(q);
};


// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);

    try {
        const updatedTrip = await Model.findOneAndUpdate({ code: req.params.tripCode }, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }, { new: true, runValidators: true } // return the updated document and validate input
        ).exec();

        if (!updatedTrip) {
            // Database returned no data
            return res.status(404).json({ message: 'Trip not found for update' });
        } else {
            // Return the updated trip
            return res.status(200).json(updatedTrip);
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

    // Uncomment the following line to show results of operation on the console
    console.log(updatedTrip);
};
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};