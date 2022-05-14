const express = require('express');
const salesController = require('../../controllers/salesController');
const { validateProductId,
  validateQuantitySale } = require('../../middlewares/validationMiddleware');

const salesRouter = express.Router();

salesRouter.get('/', salesController.salesList);
salesRouter.get('/:id', salesController.salestIdList);
salesRouter.post('/', validateProductId, validateQuantitySale, salesController.createSale);
salesRouter.put('/:id', validateProductId, validateQuantitySale, salesController.updateSale);

module.exports = salesRouter;