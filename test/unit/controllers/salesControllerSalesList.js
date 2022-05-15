const sinon = require('sinon');
const { expect } = require('chai');
const serviceSales = require('../../../services/salesService');
const controllerSales = require('../../../controllers/salesController');

describe('Testa ao chamar o controller de salesList', () => {
  describe('No retorno do banco de dados', () => { 
    const req = {};
    const res = {};

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
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceSales, 'getAllSales').resolves(mockSales);
    });

    after(() => {
      serviceSales.getAllSales.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await controllerSales.salesList(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um array contendo a lista de vendas', async () => {
      await controllerSales.salesList(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
   
})