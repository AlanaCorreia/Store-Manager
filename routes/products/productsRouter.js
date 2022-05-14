const express = require('express');
const productsController = require('../../controllers/productsController');
const { validateName, validateQuantity } = require('../../middlewares/validationMiddleware');

const productsRouter = express.Router();

productsRouter.get('/', productsController.productsList);
productsRouter.get('/:id', productsController.productIdList);
productsRouter.post('/', validateName, validateQuantity, productsController.createProduct);
productsRouter.put('/:id', validateName, validateQuantity, productsController.updateProduct);

module.exports = productsRouter;