const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
    likes: {
        type: Number,
        default: 0
    },
    mechanic: {
        type: mongoose.Schema.ObjectId,
        ref: "Mechanic",
        required: [true, 'like must be linked to a mechanic']
    }
});

likesSchema.methods.like = async function () {
    this.likes += 1;
    await this.save();
};

likesSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'mechanic',
        select: 'name'
    });
    next();
});

const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;
