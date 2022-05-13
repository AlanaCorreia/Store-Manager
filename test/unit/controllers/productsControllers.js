const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const controllerProducts = require('../../../controllers/productsController');

describe('Testa ao chamar o controller de productsList', () => { 
  describe('se retorna um array', () => { 
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'getAllProducts').resolves();
    });

    after(() => {
      serviceProducts.getAllProducts.restore();
    });

    it('se foi chamado o status 200', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.status.calledWith(200).to.be.equal(true));
    });
  });
   
})