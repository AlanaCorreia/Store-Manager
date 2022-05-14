const express = require('express');
const salesController = require('../../controllers/salesController');
const { validateProductId, validateQuantity,
  validateQuantitySale } = require('../../middlewares/validationMiddleware');

const salesRouter = express.Router();

salesRouter.get('/', salesController.salesList);
salesRouter.get('/:id', salesController.salestIdList);
salesRouter.post('/', validateProductId, validateQuantity, salesController.createSale);
salesRouter.put('/:id', validateProductId, validateQuantitySale, salesController.updateSale);

module.exports = salesRouter;