const clothModel = require('../models/clothes.model');
const slugify = require('slugify');
const{
    getErrorResponse,
    getResponseV1,
    getResponseV2
}=require('../helpers/helper');

const addNewCLoth = (req,res)=>{
    const{
        type,
        clothImg,
        qty,
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
        qty:qty,
        size:size,
        description:description,
        brand:brand,
        color:color,
        category:category,
        donatedBy:req.user.id,
    });
    console.log(_cloth);
    _cloth.save((error,cloth)=>{
        if(error){
            console.log(error);
            return getErrorResponse(res,500);
        }
        if(cloth){
            const data = [{
                cloth:{
                    id:cloth._id,
                    type:cloth.type,
                    img:cloth.clothImg,
                    qty:cloth.qty,
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

module.exports = {addNewCLoth}