const express = require('express');
const router = express.Router();

const {
    signup,
    signIn
} = require('../Controllers/auth.controller');

const{
    validateSignInRequest,
    validateSignUpRequest,
    isRequestCorrect
} = require('../middleware/request.validator')

router.post('/signup', validateSignUpRequest, isRequestCorrect, signup);
router.post('/login',validateSignInRequest,isRequestCorrect,signIn)
module.exports = router;