const express = require('express');
const router = express.Router();
const {
    addNewCategory,
    removeCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} = require('../Controllers/category.controller')

const {
    isLoggedIn,
    isAdmin,
    isUser
} = require('../middleware/auth.middleware');


const {
    validateCreateCategoryRequest,
    isRequestCorrect
} = require('../middleware/request.validator');


router.post("/create", isLoggedIn,validateCreateCategoryRequest, isRequestCorrect, addNewCategory);
router.post("/delete",isLoggedIn,removeCategory);
router.get('/getAll',isLoggedIn,getAllCategories);
router.post('/getById',isLoggedIn,getCategoryById);
router.put('/update',isLoggedIn,updateCategory);

module.exports = router;