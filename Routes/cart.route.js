const express = require('express');
const router = express.Router();

const{
    addToCart
}=require('../Controllers/cart.controller');
const {
    isLoggedIn,
    isAdmin,
    isUser
}=require('../middleware/auth.middleware');

router.post('/add',isLoggedIn,isUser,addToCart);

module.exports = router;