const rideController = require('../controllers/ride.controller');
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const { body,query } = require('express-validator');

router.post('/create',
  authMiddleware.authUser,
  body('pickup').notEmpty().withMessage('Pickup location is required'),
  body('destination').notEmpty().withMessage('Destination location is required'),
  body('vehicleType').notEmpty().withMessage('Vehicle type is required'),
  rideController.createRide
);

router.get('/get-fare', authMiddleware.authUser, query('pickup').notEmpty(), query('destination').notEmpty(),rideController.getFare);

router.post('/confirm-ride',
  authMiddleware.authCaptain,
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  rideController.confirmRide
);

router.post('/start-ride',
  authMiddleware.authCaptain,
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  body('otp').notEmpty().withMessage('OTP is required'),
  rideController.startRide
);

router.post('/finish-ride',
  authMiddleware.authCaptain,
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  rideController.finishRide
);

module.exports = router;