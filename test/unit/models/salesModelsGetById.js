const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelSales = require('../../../models/salesModel');

describe('Testa ao chamar a função getAll da camada de modelo', () => {
  describe('No retorno do banco de dados', () => {
    const executeSale =  [
      {
        "date": "2022-05-15T06:32:43.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-05-15T06:32:43.000Z",
        "productId": 2,
        "quantity": 10
      }
    ];

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

    it('que o array contem objetos com as chaves date, productId e quantity', async () => {
      const [dataSales] = await modelSales.getById(1);
      expect(dataSales).to.have.all.keys('date', 'productId', 'quantity');
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