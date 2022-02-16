const userModel = require('../models/user.model');
const {
    generateJwtToken,
    generateRefreshToken,
    getErrorResponse
}=require('../helpers/helper')

const signup = (req,res)=>{
    const {
        name,
        email,
        address,
        phone_number,
        password
    }=req.body;

    userModel.findOne({
        email:email
    }).exec((error,data)=>{
        if(error){
            console.log(error);
            return getErrorResponse(res,500)
        }

        if(data){
            return res.json({
                success:false,
                message:"User Emaiil already exists"
            })
        }

        const _user = new userModel({
            email,
            name,
            address,
            phone_number,
            password
        });

        _user.save((error,user)=>{
            if(error){
                console.log(error);
                return getErrorResponse(res,500)
            };
            if(user){
                const token = generateJwtToken(user._id,user.role);
                const refreshToken = generateRefreshToken(user._id,user.role);
                return res.json({
                    success:true,
                    message:"User has been successfully registered",
                    data:{
                        user:{
                            name:user.name,
                            email:user.email,
                            address:user.address
                        },
                        auth_token:token,
                        refresh_token:refreshToken
                    }
                })
            }
        })
    })

}

module.exports = {
    signup
}