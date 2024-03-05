const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController')
const carServiceController = require('./../controllers/carServiceController')

router.route("/services")
.get(carServiceController.getAllServices)
.post( authController.protect,
    authController.restrictTo('admin'),
    carServiceController.createCarService)

router.route("/services/:id")
.get(carServiceController.getService)
.patch(authController.protect, authController.restrictTo('admin'), carServiceController.updateCarService)
.delete(authController.protect, authController.restrictTo('admin'), carServiceController.deleteCarService)

module.exports = router