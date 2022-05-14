const salesService = require('../services/salesService');

const salesList = async (_req, res) => {
  const products = await salesService.getAllSales();
  
  res.status(200).json(products);
  return products;
};

const salestIdList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesId = await salesService.getById(id);
    
    return res.status(200).json(salesId);
  } catch (err) {
    console.log('err list salesId', err.message);
    next(err);
  }
};

const createSale = async (req, res, next) => {
  try {
    const newSale = await salesService.createSale(req.body);
  
    return res.status(201).json(newSale);
  } catch (err) {
    console.log('err create sale', err.message);
    next(err);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const upSale = await salesService.updateSale(id, req.body);
  
    return res.status(200).json(upSale);
  } catch (err) {
    console.log('err update sale', err.message);
    next(err);
  }
};

module.exports = { salesList, salestIdList, createSale, updateSale };