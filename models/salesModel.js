const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.sales');
  
  return products;
};

module.exports = { getAll };