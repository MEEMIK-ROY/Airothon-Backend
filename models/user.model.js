const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        trim:true,
        min:3
    },
    email:{
        type:String,
        required:[true,"Please provide your email ID"],
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:[true,"Please provide your password"]
    },
    phone_number:{
        type:String,
        required:[true,"Please provide your contact no."]
    },
    address:{
        type:String,
        required:[true,"Please provide your address"]
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user"
    }
})

userSchema.virtual('password').set(function(password){
    this.hash_password = bcrypt.hashSync(password,12)
})

userSchema.methods = {
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password)
    }
}

module.exports = mongoose.model('User',userSchema)