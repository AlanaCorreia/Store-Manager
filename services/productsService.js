const productsModel = require('../models/productsModel');

const errorConstructor = (status, message) => ({ status, message });

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  
  return products;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);

  if (productId.length === 0) throw errorConstructor(404, 'Product not found');
  
  return productId;
};

const createProduct = async (name, quantity) => {
  const findProduct = await productsModel.getProductByName(name);
  console.log(findProduct);
  
  if (findProduct.length !== 0) throw errorConstructor(409, 'Product already exists');

  const product = await productsModel.createProduct(name, quantity);
  
  return product;
};

const updateProduct = async (id, upProduct) => {
  const productId = await productsModel.getById(id);

  if (productId.length === 0) throw errorConstructor(404, 'Product not found');

  const product = await productsModel.updateProduct(id, upProduct);
  
  return product;
};

const deleteProduct = async (id) => {
  const productId = await productsModel.getById(id);

  if (productId.length === 0) throw errorConstructor(404, 'Product not found');

  await productsModel.deleteProduct(id);
};

module.exports = { getAllProducts, getById, createProduct, updateProduct, deleteProduct };