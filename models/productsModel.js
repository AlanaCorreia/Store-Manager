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

const getProductByName = async (productName) => {
  const [productFound] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE name = ?;', [productName]);
  
  return productFound;
};

const createProduct = async (name, quantity) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);', [name, quantity],
  );
  
  const result = {
    id: newProduct.insertId,
    name,
    quantity,
  };
  return result;
};

const updateProduct = async (id, upProduct) => {
  const { name, quantity } = upProduct;
  await connection.execute(`UPDATE StoreManager.products
    SET name = ?, quantity = ? WHERE id = ?;`, [name, quantity, id]);

  const [product] = await getById(id);

  return product;
};

module.exports = { getAll, getById, createProduct, getProductByName, updateProduct };