const passport = require('passport');
const mongoose = require('mongoose');
const Model = require('../models/user');
const User = mongoose.model('users');

const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    /*
    user.save((err) => {
        if (err) {
            return res
                .status(400)
                .json(err);
        } else {
            const token = user.generateJwt();
            return res
                .status(200)
                .json({token});
        }
    })
    */
    user.save()
    .then(() => {
        console.log("Data saved successfully");
        const token = user.generateJwt();
        return res
            .status(200)
            .json({token});
    })
    .catch((err) => {
        console.log("Data not saved successfully!");
        return res
            .status(400)
            .json(err);
    })
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log("Error on authentication");
            console.log(err);
            return res
                .status(400)
                .json(err);
        }
        if (user) {
            const token = user.generateJwt();
            return res
                .status(200)
                .json(token);
        } else {
            return res
                .status(401)
                .json(info);
        }
    }) (req, res);
};

module.exports = {
    register,
    login
};