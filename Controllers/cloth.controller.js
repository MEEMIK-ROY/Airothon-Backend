const clothModel = require('../models/clothes.model');
const{
    getErrorResponse,
    getResponseV1,
    getResponseV2
}=require('../helpers/helper');

const addCLoth = (req,res)=>{
    const{
        type,
        clothImg,
        size,
        description,
        brand,
        color,
        category    
    } = req.body;
    const clothName = type+size+brand+color
    const _cloth = new clothModel({
        type:type,
        slug:slugify(clothName),
        clothImg:clothImg,
        size:size,
        description:description,
        brand:brand,
        color:color,
        category:category,
        donatedBy:req.user.id,
    });

    _cloth.save((error,cloth)=>{
        if(error){
            return getErrorResponse(res,500);
        }
        if(cloth){
            const data = [{
                cloth:{
                    id:cloth._id,
                    type:cloth.type,
                    img:cloth.clothImg,
                    slug:cloth.slug,
                    size:cloth.size,
                    description:cloth.description,
                    brand:cloth.brand,
                    color:cloth.color,
                    category:cloth.category,
                    donatedBy:cloth.donatedBy,
                }
            }]
            return getResponseV2(res,true,200,"Cloth added successfully",data);
        }
    })
}

module.exports = {
    addCLoth
}