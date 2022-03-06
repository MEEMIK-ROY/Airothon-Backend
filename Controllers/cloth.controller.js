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

const removeClothById = async (req,res)=>{
    try {
        const cloth = await clothModel.findOneAndDelete({
            "_id":req.body.id
        });
        return getResponseV2(res,true,200,cloth);
    } catch (error) {
        console.log(error);
        return getErrorResponse(res,500);
    }
}

const getAllClothes = async (req, res) => {
    try {
        const clothes = await clothModel.find({});
        return getResponseV2(res,true,200,clothes);
    } catch (error) {
        console.log(error);
        return getErrorResponse(res,500);
    }
}

const getClothById = async(req,res)=>{
    try {
        const cloth = await clothModel.findOne({
            _id: req.body.id
        });
        return getResponseV1(res, 200, cloth)
    } catch (error) {
        console.log(error);
        return getErrorResponse(res,500);
    }
}

// const updateClothById = async(req,res)=>{
//     const{
//         type,
//         clothImg,
//         qty,
//         size,
//         description,
//         brand,
//         color,
//         category    
//     } = req.body;
//     try{
//         const cloth = await clothModel.updateOne(
//             {
//                 "_id":req.body.id
//             },
//             {
//                 $set:{
//                     "type":type,
//                     "clothImg":clothImg,
//                     "qty":qty,
//                     "size":size,
//                     "description":description,
//                     "brand":brand,
//                     "color":color,
//                     "category":category
//                 }
//             },(error,clothres)=>{
//                 if(error){
//                     console.log(error);
//                     return getErrorResponse(res,500,error);
//                 }
//                 if(clothres){
//                     // return getResponseV2(res,true,200,"Cloth updated successfully",clothres);
//                 }
//             }
//         )
//     }catch(error){
//         console.log(error);
//         return getErrorResponse(res,500,error);
//     }
// }

module.exports = {
    addNewCLoth,
    removeClothById,
    getAllClothes,
    getClothById,
    // updateClothById
};