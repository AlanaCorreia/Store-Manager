const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  
  return products;
};

module.exports = { getAllProducts };