const { Router } = require('express');
const express = require('express');
const Indexrouter = express.Router();

const authRoutes = require('./auth.route');


Router.use('/',authRoutes)


module.exports = Indexrouter