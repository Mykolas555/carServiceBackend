const Review = require('../models/reviewModel')

exports.getReviewsByMechanic = async (req, res) => {
    try {
        const filter = { mechanic: req.params.id };
        const reviews = await Review.find(filter);
        console.log(reviews)
        return res.status(200).json({
            status: "success",
            data: { reviews }
        });
    } catch (err) {
        return res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.status(200).json({
            status: "success",
            data: { reviews }
        });
    } catch (err) {
        return res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.createReview = async (req, res) => {
    try {
        if (!req.body.carService) req.body.carService = req.params.carServiceId;
        if (!req.body.user) req.body.user = req.user.id;

        const newReview = await Review.create(req.body);
        res.status(201).json({
            status: "success",
            message: "New review is created",
            data: { newReview }
        });
    } catch (err) {
        console.error(err);
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};
