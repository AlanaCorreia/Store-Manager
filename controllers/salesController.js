const salesService = require('../services/salesService');

const salesList = async (req, res) => {
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

module.exports = { salesList, salestIdList };