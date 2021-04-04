const express = require('express');

const router = express.Router();

const locationController = require('../Controllers/locations');
const mealtypeController = require('../Controllers/mealtypes');
const restaurantController = require('../Controllers/restaurant');
const userController = require('../Controllers/user');
const paymentGatewayController=require('../Controllers/Payment');



router.get('/locations', locationController.getLocations);
router.get('/mealtypes', mealtypeController.getMealTypes);
router.get('/restaurantbylocation/:locationId', restaurantController.getRestaurantByLocation);
router.post('/filter', restaurantController.filterRestaurants);
router.get('/getrestaurantbyid/:restaurantId', restaurantController.getRestaurantDetailsById);
router.post('/usersignup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.post('/payment',paymentGatewayController.payments);
router.post('/callback',paymentGatewayController.callback);
router.get('/getItemsbyrestaurant/:resId',restaurantController.getItemsByRestaurant);
module.exports = router;

