const express = require('express');
const router = express.Router();
const {
    addNewCategory,
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


router.post("/create", isLoggedIn,validateCreateCategoryRequest, isRequestCorrect, addNewCategory)
module.exports = router;