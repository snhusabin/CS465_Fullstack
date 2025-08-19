const express = require('express');
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens
const router = express.Router();

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Middleware: Authenticate JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if (authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if (headers.length < 2) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));

    jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            console.log('Token Validation Error!');
            return res.status(401).json('Token Validation Error!');
        }
        req.auth = verified; // store decoded token in req.auth
        next(); // proceed to next middleware/controller
    });
}

// -------------------- AUTH ROUTES --------------------
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// -------------------- TRIP ROUTES --------------------
router
    .route('/trips')
    .get(tripsController.tripsList) // GET all trips
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST new trip (protected)

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET trip by code
    .put(authenticateJWT, tripsController.tripsUpdateTrip); // PUT update trip (protected)

module.exports = router;