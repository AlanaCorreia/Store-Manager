const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAll();
  
  return sales;
};

module.exports = { getAllSales };