const Likes = require('../models/likesModel');

exports.getLikesForMechanic = async (req, res, next) => {
    try {
        const mechanicId = req.params.mechanicId;
        const likes = await Likes.find({ mechanic: mechanicId });
        res.status(200).json({ 
            status: 'success', 
            data: { likes } 
        });
    } catch (error) {
        next(error);
    }
};

exports.postLikeToMechanic = async (req, res, next) => {
    try {
        const { mechanicId } = req.body;
        const like = await Likes.findOneAndUpdate(
            { mechanic: mechanicId },
            {},
            { upsert: true }
        );
        await like.like();
        res.status(200).json({ 
            status: 'success', 
            data: { likes: like.likes } 
        });
    } catch (error) {
        next(error);
    }
};