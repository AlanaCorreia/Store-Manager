const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  
  return products;
};

const getById = async (idProduct) => {
  const [productId] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC;', [idProduct]);
  
  return productId;
};

module.exports = { getAll, getById };