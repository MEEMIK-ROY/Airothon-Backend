const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const clothesRoutes = require('./cloth.route');
const categoryRoutes = require('./category.route');
const cartRoutes = require('./cart.route');


router.use('/',authRoutes);
router.use('/cloth',clothesRoutes);
router.use('/category',categoryRoutes);
router.use('/cart',cartRoutes);


module.exports = router