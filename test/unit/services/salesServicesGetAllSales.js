const sinon = require('sinon');
const { expect } = require('chai');
const serviceSales = require('../../../services/salesService');
const modelSales = require('../../../models/salesModel');


describe('Testa ao chamar no service a função getAllSales', () => {
  describe('No retorno do banco de dados', () => {
    const mockSales = [
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

    before(() => {
      sinon.stub(modelSales, 'getAll').resolves(mockSales);
    });

    after(() => {
      modelSales.getAll.restore();
    });

    it('se existe um array com todas as vendas presentes no banco de dados', async () => {
      const dataSales = await serviceSales.getAllSales();
      expect(dataSales).to.be.equal(mockSales);
    });
  });
});