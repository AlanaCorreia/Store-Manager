const salesModel = require('../models/salesModel');

const errorConstructor = (status, message) => ({ status, message });

const getAllSales = async () => {
  const sales = await salesModel.getAll();
  
  return sales;
};

const getById = async (id) => {
  const salesId = await salesModel.getById(id);

  if (salesId.length === 0) throw errorConstructor(404, 'Sale not found');
  
  return salesId;
};

const createSale = async (newSale) => {
  const saleId = await salesModel.createSale();
  
  await Promise.all(newSale
    .map(({ productId, quantity }) => salesModel.createSaleProduct(productId, quantity, saleId)));
  
  const result = {
    id: saleId,
    itemsSold: newSale,
  };

  return result;
};

const updateSale = async (id, upData) => {
  const salesId = await salesModel.getById(id);

  if (salesId.length === 0) throw errorConstructor(404, 'Sale not found');
  
  return { id, upData };
};

module.exports = { getAllSales, getById, createSale, updateSale };