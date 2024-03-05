const CarService = require('./../models/carServiceModel')

// create service
exports.createCarService = async (req, res) =>{
    try{
        const newCarService = await CarService.create(req.body)
        res.status(201).json({
            status: "success",
            message: "new service is created",
            data: {newCarService}
        })
    }catch(err){
        res.status(404).json({
            status: "fail to create new service",
            message:err
        })
    }
}

//update service
exports.updateCarService = async (req, res) =>{
    try{
        const carService = await CarService.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            message: "service is updated",
            data: {carService}
        })
    }catch(err){
        res.status(404).json({
            status: "fail to update service",
            message:err
        })
    }
}

// delete service
exports.deleteCarService = async (req, res) =>{
    try{
        await CarService.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "service is deleted",
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: "fail to delete service",
            message:err
        })
    }
}

// get service by id
exports.getService = async (req, res)=>{
    try{
        const service = await CarService.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {service}
        })
    }catch(err){
        res.status(404).json({
            status: "fail to get service data",
            message:err
        })
    }
}

// get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await CarService.find();
        return res.status(200).json({
            status: "success",
            results: services.length,
            data: { services }
        });
    } catch (err) {
        console.error(err);
        return res.status(404).json({
            status: "failed to get all services",
            message: err.message
        });
    }
};