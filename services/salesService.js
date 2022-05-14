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
  console.log(newSale);
  
  Promise.all(newSale
    .map(({ productId, quantity }) => salesModel.createSaleProduct(saleId, productId, quantity)));
 
  const result = {
    id: saleId,
    itemsSold: newSale,
  };

  return result;
};

const updateSale = async (id, upData) => {
  await salesModel.deleteSaleProduct(id);

  Promise.all(upData
    .map(({ productId, quantity }) => salesModel.createSaleProduct(id, productId, quantity)));
 
  const result = {
    saleId: Number(id),
    itemUpdated: upData,
  };

  return result;
};

module.exports = { getAllSales, getById, createSale, updateSale };

// const salesId = await salesModel.getById(id);

// if (salesId.length === 0) throw errorConstructor(404, 'Sale not found');

// Promise.all(upData
//   .map(({ productId, quantity }) => salesModel.updateSale(id, productId, quantity)));