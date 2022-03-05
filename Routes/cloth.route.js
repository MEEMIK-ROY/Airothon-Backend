const express = require('express');
const router = express.Router();

const{
    isLoggedIn,
    isUser,
    isAdmin
}=require('../middleware/auth.middleware');

const {
    addNewCLoth,
    removeClothById,
    getAllClothes,
    getClothById
}=require('../Controllers/cloth.controller')

router.post('/add',isLoggedIn,addNewCLoth);
router.post('/deleteById',isLoggedIn,removeClothById)
router.get('/getAll',isLoggedIn,getAllClothes);
router.post('/getById',isLoggedIn,getClothById)

module.exports = router;