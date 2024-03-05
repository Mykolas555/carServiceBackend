const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Please enter a mechanic review"]
    },
    service: {
        type: mongoose.Schema.ObjectId,
        ref: "CarService",
        required: [true, 'Review must be linked to car service']
    },
    mechanic: {
        type: mongoose.Schema.ObjectId,
        ref: "Mechanic", 
        required: [true, 'Review must be linked to mechanic']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: [true, 'Review must be linked to user']
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'service',
        select: 'name'
    })
    this.populate({
        path: 'mechanic',
        select: 'name lastName specialization' 
    });
    next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
