const express = require('express');
const salesController = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.salesList);
salesRouter.get('/:id', salesController.salestIdList);

module.exports = salesRouter;