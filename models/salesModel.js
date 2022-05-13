const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`SELECT sale.id AS saleId, sale.date AS date,
  saProd.product_id AS productId, saProd.quantity AS quantity FROM StoreManager.sales AS sale
  INNER JOIN StoreManager.sales_products AS saProd
  ON sale.id = saProd.sale_id;
  `);
  return sales;
};

const getById = async (idSale) => {
  const [saleById] = await connection
  .execute(`SELECT sale.date AS date,
  saProd.product_id AS productId, saProd.quantity AS quantity FROM StoreManager.sales AS sale
  INNER JOIN StoreManager.sales_products AS saProd
  ON sale.id = saProd.sale_id
  WHERE sale.id = ?
  ORDER BY sale.id ASC;
  `, [idSale]);

  return saleById;
};

module.exports = { getAll, getById };