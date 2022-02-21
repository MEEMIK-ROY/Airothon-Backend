const categoryModel = require('../models/category.model');
const slugify = require('slugify');


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

module.exports = {
    addNewCategory
}