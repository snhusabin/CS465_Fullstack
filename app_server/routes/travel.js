// app_server/routes/travel.js
var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel'); // Path is relative to this file

/* GET travel page. */
router.get('/', controller.travel);

module.exports = router;