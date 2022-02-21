const express = require('express');
const router = express.Router();

const{
    isLoggedIn,
    isUser,
    isAdmin
}=require('../middleware/auth.middleware');

const {
    addNewCLoth
}=require('../Controllers/cloth.controller')

router.post('/add',isLoggedIn,addNewCLoth);

module.exports = router;