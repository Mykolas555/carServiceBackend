const mongoose = require("mongoose");

const mechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Mechanic must have a name"]
    },
    lastName: {
        type: String,
        required: [true, "Mechanic must have a last name"]
    },
    specialization: {
        type: String,
        required: [true, "Mechanic must have a specialization"]
    },
    service: {
        type: mongoose.Schema.ObjectId,
        ref: "CarService",
        required: [true, 'Mechanic must be linked to a car service']
    },
    mechanicReviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Review"
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

mechanicSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'service',
        select: 'name address city mannager'
    })
    this.populate({
        path: 'mechanicReviews',
        select: 'user'
    })
    next();
});

const Mechanic = mongoose.model('Mechanic', mechanicSchema);

module.exports = Mechanic;
