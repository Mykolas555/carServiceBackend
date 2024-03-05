const mongoose = require("mongoose")

const carSerciceSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "a service must have a name"],
        unique: true,
    },
    city:{
        type:String,
        required:[true, 'a service must have city'],
    },
    address:{
        type:String,
        required:[true, 'a service must have an address'],
    },
    mannager:{
        type: String,
        required:[true, 'a service must have confort mannager'],
    }
},
{
    toJson:{virtuals:true},
    toObject:{virtuals:true}
}
)

const CarService = mongoose.model('CarService', carSerciceSchema)

module.exports = CarService