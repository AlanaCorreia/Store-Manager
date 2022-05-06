const express = require('express');
const productsController = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.productsList);

module.exports = { productsRouter };