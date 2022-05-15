const sinon = require('sinon');
const { expect } = require('chai');
const serviceSales = require('../../../services/salesService');
const modelSales = require('../../../models/salesModel');


describe('Testa ao chamar no service a função getById', () => {
  describe('Quando existe a venda no banco de dados', () => {
    const mockSale = [
      {
        "date": "2022-05-15 03:32:43",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-05-15 03:32:43",
        "productId": 2,
        "quantity": 10
      }
    ]

    before(() => {
      sinon.stub(modelSales, 'getById').resolves(mockSale);
    });

    after(() => {
      modelSales.getById.restore();
    });

    it('é um array', async () => {
      const dataProducts = await serviceSales.getById(1);
      expect(dataProducts).to.be.a('array');
    });

    it('que o array contem objetos', async () => {
      const [dataSale] = await serviceSales.getById(1);
      expect(dataSale).to.be.an('object');
    });

    it('que o array contem objetos com as chaves date, product e quantity', async () => {
      const [dataSale] = await serviceSales.getById(1);
      expect(dataSale).to.have.all.keys('date', 'productId', 'quantity');
    });
  });
});