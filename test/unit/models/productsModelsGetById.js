const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelProducts = require('../../../models/productsModel');

describe('Testa ao chamar a função getById da camada de modelo', () => {
  describe('Quando existe o produto no banco de dados', () => {
    const executeProduct =  [{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }]

    before(async () => {
      sinon.stub(connection, 'execute').resolves([executeProduct]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se existe um array', async () => {
      const dataProduct = await modelProducts.getById(1);
      expect(dataProduct).to.be.an('array');
    });

    it('se no array contém objetos', async () => {
      const [dataProduct] = await modelProducts.getById(1);
      expect(dataProduct).to.be.an('object');
    });

    it('que o array contem objetos com as chaves id, name e quantity', async () => {
      const [dataProduct] = await modelProducts.getById(1);
      expect(dataProduct).to.have.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando não existe o produto no banco de dados', () => {
    const executeProduct = [];

    before(async () => {
      sinon.stub(connection, 'execute').resolves([executeProduct]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se existe um array', async () => {
      const dataProduct = await modelProducts.getById(9);
      expect(dataProduct).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const dataProduct = await modelProducts.getById(9);

      expect(dataProduct).to.be.empty;
    });
  });
});