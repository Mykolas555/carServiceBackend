const User = require('./../models/userModel')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            status: "success",
            data: { users }
        });
        } catch (err) {
            return res.status(404).json({
            status: "fail to get users",
            message: err
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: { user }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};