const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ "Message": "All fields required" });
    }

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        const savedUser = await user.save();
        const token = user.generateJwt();
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(400).json(err);
    }
};

const login = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "Message": "All fields required" });
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !user.validPassword(req.body.password)) {
            return res.status(401).json({ "Message": "Invalid credentials" });
        }

        const token = user.generateJwt();
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    register,
    login
};