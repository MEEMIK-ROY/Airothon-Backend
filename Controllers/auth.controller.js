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
                        auth_token:{
                            token:token,
                            expiresIn:"1 day"
                        },
                        refresh_token:{
                            token:refreshToken,
                            expiresIn:"30 days"
                        }
                    }
                })
            }
        })
    })

}

const signIn = async (req,res)=>{
    const {
        email,
        password
    }=req.body;

    try{
        const user = await userModel.findOne({
            email:email
        });

        const isAuthenticated = user.authenticate(password)
        if(isAuthenticated){
            const token = generateJwtToken(user._id,user.role);
            const refreshToken = generateRefreshToken(user._id,user.token);
            return res.status(200).json({
                success:true,
                message:"User logged in successfully",
                data:{
                    user:{
                        name:user.name,
                        email:user.email,
                        address:user.address
                    },
                    auth_token:{
                        token:token,
                        expiresIn:"1 day"
                    },
                    refresh_token:{
                        token:refreshToken,
                        expiresIn:"30 days"
                    }
                }
            })
        }else{
            return res.json({
                success:false,
                message:"User Login failed. Bad Authentication"
            });
        }
    }
    catch(error){
        console.log(error);
        return getErrorResponse(res,500);
    }
}

module.exports = {
    signup,
    signIn
}