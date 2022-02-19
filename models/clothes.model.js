const mongoose = require('mongoose');

const clothSchema = mongoose.Schema({
    type:{
        type:String,
        required:[true,"Please provide the type of cloth"],
    },
    slug:{
        type:String,
        required:[true,"Please provide cloth sklug"],
        unique:true,
        trim:true
    },
    clothImg:[{
        img:String
        }
    ],
    size:{
        type:String,
        required:[true,"Please provide cloth size"]
    },
    description:{
        type:String
    },
    brand:{
        required:[true,"Please provide cloth brand"],
        type:String
    },
    color:{
        type:String,
        required:[true,"Please provide cloth color"],
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    donatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Cloth',clothSchema);