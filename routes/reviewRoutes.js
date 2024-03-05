const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const authController = require('../controllers/authController');

router.route("/reviews")
.get(reviewController.getReviews)
.post(authController.protect, reviewController.createReview);


router.route("/mechanics/:id/reviews")
.get(reviewController.getReviews);

module.exports = router;
