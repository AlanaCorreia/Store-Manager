const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelSales = require('../../../models/salesModel');

describe('Testa ao chamar a função getById da camada de modelo', () => {
  describe('Quando existe o produto no banco de dados', () => {
    const executeSale =  [{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }]

    before(async () => {
      sinon.stub(connection, 'execute').resolves([executeSale]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se existe um array', async () => {
      const dataSales = await modelSales.getById(1);
      expect(dataSales).to.be.an('array');
    });

    it('se no array contém objetos', async () => {
      const [dataSales] = await modelSales.getById(1);
      expect(dataSales).to.be.an('object');
    });

    it('que o array contem objetos com as chaves id, name e quantity', async () => {
      const [dataSales] = await modelSales.getById(1);
      expect(dataSales).to.have.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando não existe o produto no banco de dados', () => {
    const executeSale = [];

    before(async () => {
      sinon.stub(connection, 'execute').resolves([executeSale]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se existe um array', async () => {
      const dataSales = await modelSales.getById(9);
      expect(dataSales).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const dataSales = await modelSales.getById(9);

      expect(dataSales).to.be.empty;
    });
  });
});