const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const clothesRoutes = require('./cloth.route');
const categoryRoutes = require('./category.route');


router.use('/',authRoutes);
router.use('/cloth',clothesRoutes);
router.use('/category',categoryRoutes);


module.exports = router