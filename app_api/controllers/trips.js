const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Registered model

// GET: /trips - lists all the trips
const tripsList = async(req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        }

        return res.status(200).json(trips);
    } catch (err) {
        console.error("Error fetching trips:", err);
        return res.status(500).json({ error: err.message });
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async(req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        return res.status(200).json(trip);
    } catch (err) {
        console.error("Error fetching trip:", err);
        return res.status(500).json({ error: err.message });
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async(req, res) => {
    try {
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

        const trip = await newTrip.save();
        return res.status(201).json(trip);
    } catch (err) {
        console.error("Error adding trip:", err);
        return res.status(400).json({ error: err.message });
    }
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async(req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate({ code: req.params.tripCode }, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }, { new: true, runValidators: true } // return updated doc, validate inputs
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found for update' });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        console.error("Error updating trip:", err);
        return res.status(400).json({ error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};