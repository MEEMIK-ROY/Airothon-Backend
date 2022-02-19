const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const clothRoutes = require('./cloth.route');


router.use('/',authRoutes);
router.use('/cloth',clothRoutes);


module.exports = router