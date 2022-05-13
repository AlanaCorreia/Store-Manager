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

module.exports = { getAllSales, getById };