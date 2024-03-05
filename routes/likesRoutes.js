const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');
const authController = require('../controllers/authController');

router.route('/likes/mechanics/:mechanicId')
.get(likesController.getLikesForMechanic)
.post(authController.protect, likesController.postLikeToMechanic);

module.exports = router;