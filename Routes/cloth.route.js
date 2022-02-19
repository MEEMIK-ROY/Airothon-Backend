const express = require('express');
const router = express.Router();

const{
    isLoggedIn,
    isUser,
    isAdmin
}=require('../middleware/auth.middleware');

const {
    addCloth
}=require('../Controllers/cloth.controller')

router.post('/create',isLoggedIn,addCloth);

module.exports = router;