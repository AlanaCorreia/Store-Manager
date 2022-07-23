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

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsService.createProduct(name, quantity);
  
    return res.status(201).json(newProduct);
  } catch (err) {
    console.log('err cretae product', err.message);
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const upProduct = await productsService.updateProduct(id, req.body);
  
    return res.status(200).json(upProduct);
  } catch (err) {
    console.log('err update product', err.message);
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.deleteProduct(id);

    return res.status(204).end();
  } catch (err) {
    console.log('err delete product', err.message);
    next(err);
  }
};

module.exports = { productsList, productIdList, createProduct, updateProduct, deleteProduct };