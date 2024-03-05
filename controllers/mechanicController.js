const Mechanic = require('./../models/mechanicModel')
const Review = require('./../models/reviewModel');

// create mechanic
exports.createMechanic = async (req, res) =>{
    try{
        const newMechanic = await Mechanic.create(req.body)
        res.status(201).json({
            status: "success",
            message: "new mechanic is created",
            data: {newMechanic}
        })
    }catch(err){
        res.status(404).json({
            status: "fail to create new mechanic",
            message:err
        })
    }
}

//update mechanic
exports.updateMechanic = async (req, res) =>{
    try{
        const mechanic = await Mechanic.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            message: "mechanic is updated",
            data: {mechanic}
        })
    }catch(err){
        res.status(404).json({
            status: "fail to update mechanic",
            message:err
        })
    }
}

// delete mechanic
exports.deleteMechanic = async (req, res) =>{
    try{
        await Mechanic.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "mechanic is deleted",
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: "fail to delete mechanic",
            message:err
        })
    }
}

// get mechanic by id
exports.getMechanic = async (req, res, next) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                mechanic,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail to get mechanic data',
            message: err.message
        });
    }
};


// get all mechanics
exports.getAllMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.find();
        return res.status(200).json({
            status: "success",
            results: mechanics.length,
            data: { mechanics }
        });
    } catch (err) {
        console.error(err);
        return res.status(404).json({
            status: "failed to get all mechanics",
            message: err.message
        });
    }
};