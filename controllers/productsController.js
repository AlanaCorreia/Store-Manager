const productsService = require('../services/productsService');

const productsList = async (req, res) => {
  const products = await productsService.getAllProducts();
  
  res.status(200).json(products);
  return products;
};

const productIdList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await productsService.getById(id);
  
    return res.status(200).json(productId);
  } catch (err) {
    console.log('err list productId', err.message);
    next(err);
  }
};

module.exports = { productsList, productIdList };