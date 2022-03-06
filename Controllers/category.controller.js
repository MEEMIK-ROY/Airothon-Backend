const categoryModel = require('../models/category.model');
const slugify = require('slugify');

const{
    getErrorResponse,
    getResponseV1,
    getResponseV2
}=require('../helpers/helper');
const cartModel = require('../models/cart.model');

const addNewCategory = (req, res) => {

    let slug = slugify(req.body.name, {
        lower: true
    });

    const categoryInput = {
        name: req.body.name,
        slug: slug
    };

    categoryInput.createdBy = req.user.id;
    

    if (req.body.parentId) {
        categoryInput.parentId = req.body.parentId;
    }

    const _category = new categoryModel(categoryInput);
    _category.save((error, category) => {

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            });
        }

        if (category) {
            return res.status(201).json({
                success: true,
                message: "Category Saved successfully",
                data: category
            })
        }
    })
}

const removeCategory = async (req,res)=>{
    try {
        const category = await categoryModel.findOneAndDelete({
            "_id":req.body.id
        });
        return getResponseV2(res,true,200,category);
    } catch (error) {
        console.log(error);
        return getErrorResponse(res,500);
    }
}

const getAllCategories = async (req, res) => {

    try {
        const category = await categoryModel.find({});
        return getResponseV2(res,true,200,category);
    } catch (error) {
        console.log(error);
        return getErrorResponse(res,500);
    }
};

const getCategoryById = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({
            _id: req.body.id
        });
        return getResponseV1(res, 200, category)
    } catch (error) {
        console.log(error);
        return getErrorResponse(res,500);
    }
}

const updateCategory = async(req,res)=>{
    const {
        name,
        slug
    }=req.body;
    const category = await categoryModel.updateOne(
        {
        "_id":req.body.id
    },{
        $set:{
            "name":name,
            "slug":slug
        }
    },(err,catres)=>{
        if(err){
            console.log(err);
            return getErrorResponse(res,500,error);
        }
        if(catres){
            return getResponseV2(res,true,200,"Category updated successfully",catres);
        }
    })
}
module.exports = {
    addNewCategory,
    removeCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
}