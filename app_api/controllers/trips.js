const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register Model
const UserModel = require('../models/user');
const Model = mongoose.model('trips');
const User = mongoose.model('users');

// GET : /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
	const q = await Model
		.find({}) // No filter, return all records
		.exec();

		// Uncomment the following line to show results of querey
		// on the console
		// console.log(q);
	
	if(!q) {
		// Database returned no data
		return res
			.status(404)
			.json(err);
	} else {
		// Return resulting trip list
		return res
			.status(200)
			.json(q);
	}
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
	const q = await Model
		.find({'code' : req.params.tripCode}) // Return a single record
		.exec();

		// Uncomment the following line to show results of querey
		// on the console
		// console.log(q);
	
	if(!q) {
		// Database returned no data
		return res
			.status(404)
			.json(err);
	} else {
		// Return resulting trip list
		return res
			.status(200)
			.json(q);
	}
};

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {            
        User
            .findOne({ email : req.payload.email })         
            .exec((err, user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({"message": "User not found"});
            } else if (err) {
                console.log(err);
                return res
                    .status(404)
                    .json(err);
            }
            callback(req, res, user.name);                
            });
    } else {
        console.log("User not found here.");
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    getUser(req, res,
        async (req, res) => {
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
        
            if (!q) {
                // Database returned no data
                return res
                    .status(400)
                    .json(err);
            } else {
                return res
                    .status(201)
                    .json(q);
            }
        
            // console.log(q);
        }
    )
}

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);
    getUser(req, res,
        async (req, res) => {
            const q = await Model
                .findOneAndUpdate(
                {'code': req.params.tripCode},
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description,
                }
            )
            .exec();
            if(!q) {
                // Database returned no data
                return res
                    .status(400)
                    .json(err);
            } else {
                return res
                    .status(201)
                    .json(q);
            }

            // Uncomment the following line to show results of operation
            // on the console
            // console.log(q);
        }
    )

    
}

module.exports = {
	tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
