const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales');
  console.log(sales);
  return sales;
};

const getById = async (idSale) => {
  const [saleById] = await connection
  .execute('SELECT * FROM StoreManager.sales WHERE id = ? ORDER BY id ASC', [idSale]);

  return saleById;
};

module.exports = { getAll, getById };