const productsService = require('../services/productsService');

const productsList = async (req, res) => {
  const products = await productsService.getAllProducts();
  
  res.status(200).json(products);
  return products;
};

module.exports = { productsList };