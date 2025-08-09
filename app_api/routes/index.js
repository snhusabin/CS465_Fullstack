const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList) // GET all trips
    .post(tripsController.tripsAddTrip); // POST add a new trip

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET trip by code
    .put(tripsController.tripsUpdateTrip);


module.exports = router;