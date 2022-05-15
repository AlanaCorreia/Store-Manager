const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelSales = require('../../../models/salesModel');

describe('Testa ao chamar a função getAll da camada de modelo', () => {
  describe('No retorno do banco de dados', () => {

    const executeSales = [
      {
        "saleId": 1,
        "date": "2022-05-15T01:25:16.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-05-15T01:25:16.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-05-15T01:25:16.000Z",
        "productId": 3,
        "quantity": 15
      }
    ]

    before(async () => {
      sinon.stub(connection, 'execute').resolves([executeSales]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se existe um array', async () => {
      const dataSales = await modelSales.getAll();
      expect(dataSales).to.be.an('array');
    });

    it('se no array contém objetos', async () => {
      const [dataSales] = await modelSales.getAll();
      expect(dataSales).to.be.an('object');
    });

    it('que o array contem objetos com as chaves saleId, date, productId e quantity', async () => {
      const [dataSales] = await modelSales.getAll();
      expect(dataSales).to.have.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});