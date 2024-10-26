const express = require('express'); // Express app
const router = express.Router();    // Router logic
const {expressjwt} = require('express-jwt');
const auth = expressjwt({
    secret: process.env.JWT_SECRET,          
    userProperty: 'payload',
    algorithms: ['sha1', 'RS256', 'HS256']                  
});

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');


// Routes for authentication
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
