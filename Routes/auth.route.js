const { Router } = require('express');
const express = require('express');
const authRouter = express.Router();

const {
    signup
} = require('../Controllers/auth.controller');

const{
    validateSignInRequest,
    validateSignUpRequest,
    isRequestCorrect
} = require('../middleware/request.validator')

Router.post('/signup',validateSignUpRequest,isRequestCorrect,signup)
module.exports = authRouter;