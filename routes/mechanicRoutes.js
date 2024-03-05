const express = require('express');
const router = express.Router({mergeParams:true});
const authController = require('./../controllers/authController')
const mechanicController = require('./../controllers/mechanicController')

router.route("/mechanics")
.get(mechanicController.getAllMechanics)
.post( authController.protect, mechanicController.createMechanic)

router.route("/mechanics/:id")
.get(mechanicController.getMechanic)
.patch(authController.protect, mechanicController.updateMechanic)
.delete(authController.protect, mechanicController.deleteMechanic)

module.exports = router