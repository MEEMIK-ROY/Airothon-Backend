const express = require('express');
const router = express.Router();

const{
    addToCart,
    removeFromCart,
    getCart
}=require('../Controllers/cart.controller');
const {
    isLoggedIn,
    isAdmin,
    isUser
}=require('../middleware/auth.middleware');

router.post('/add',isLoggedIn,isUser,addToCart);
router.post('/remove',isLoggedIn,removeFromCart);
router.get('/get',isLoggedIn,getCart);

module.exports = router;