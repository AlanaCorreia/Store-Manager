const express = require('express');
const productsRouter = require('./products/productsRouter');
const salesRouter = require('./sales/salesRouter');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;