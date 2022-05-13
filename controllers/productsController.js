const productsService = require('../services/productsService');

const productsList = async (_req, res, next) => {
  try {
    const products = await productsService.getAllProducts();
  
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const productIdList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await productsService.getById(id);
  
    return res.status(200).json(productId[0]);
  } catch (err) {
    console.log('err list productId', err.message);
    next(err);
  }
};

module.exports = { productsList, productIdList };