const productsModel = require('../models/productsModel');

const errorConstructor = (status, message) => ({ status, message });

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  
  return products;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);

  if (productId.length === 0) throw errorConstructor(404, 'Produto não encontrada');
  
  return productId;
};

module.exports = { getAllProducts, getById };