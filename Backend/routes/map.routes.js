const express = require('express');
const router = express.Router();

const mapController = require('../controllers/map.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

router.get('/get-coordinates', query('address').isString().isLength({min:3}) ,authMiddleware.authUser, mapController.getCoordinates);

router.get('/get-distance-time', query('origin').isString().isLength({min:3}),query('destination').isString().isLength({min:3}),authMiddleware.authUser,mapController.getDistanceAndTime);

router.get('/get-suggested-places', query('address').isString().isLength({min:3}), authMiddleware.authUser, mapController.getSuggestedPlaces);

module.exports = router;
