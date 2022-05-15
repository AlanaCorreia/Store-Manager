const sinon = require('sinon');
const { expect } = require('chai');
const serviceSales = require('../../../services/salesService');
const controllerSales = require('../../../controllers/salesController');

describe('Testa ao chamar o controller de salestIdList', () => {
  describe('Quando não existe a venda no banco de dados', () => { 
    const req = {};
    const res = {};
    const next = () => {};

    const erro = {status: 404, message: 'Sale not found'};

    before(() => {
      req.params = { id: 9 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceSales, 'getById').throws(erro);
    });

    after(() => {
      serviceSales.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      try {
        await controllerSales.salestIdList(req, res, next);
      } catch (error) {
        expect(error.status.calledWith(404)).to.be.equal(true);
      }
      
    });

    it('é chamado o json com um objeto de erro', async () => {
      try {
        await controllerSales.salestIdList(req, res, next);
      } catch (error) {
         expect(error.message.calledWith('Sale not found')).to.be.equal(true);
      }
      
     
    });
  });

  describe('Quando existe o produto no banco de dados', () => { 
    const req = {};
    const res = {};

    const mockSale = [
      {
        "date": "2022-05-15T01:25:16.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-05-15T01:25:16.000Z",
        "productId": 2,
        "quantity": 10
      }
    ]

    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceSales, 'getById').resolves(mockSale);
    });

    after(() => {
      serviceSales.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await controllerSales.salestIdList(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um array contendo a venda', async () => {
      await controllerSales.salestIdList(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
})