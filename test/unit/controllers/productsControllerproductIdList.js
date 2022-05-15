const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const controllerProducts = require('../../../controllers/productsController');

describe('Testa ao chamar o controller de productIdList', () => {
  describe('Quando não existe o produto no banco de dados', () => { 
    const req = {};
    const res = {};
    const next = () => {};

    const erro = {status: 404, message: 'Product not found'};

    before(() => {
      req.params = { id: 6 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'getById').throws(erro);
    });

    after(() => {
      serviceProducts.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      try {
        await controllerProducts.productIdList(req, res, next);
      } catch (error) {
        expect(error.status.calledWith(404)).to.be.equal(true);
      }
      
    });

    it('é chamado o json com um objeto de erro', async () => {
      try {
        await controllerProducts.productIdList(req, res, next);
      } catch (error) {
         expect(error.message.calledWith('Product not found')).to.be.equal(true);
      }     
    });
  });

  describe('Quando existe o produto no banco de dados', () => { 
    const req = {};
    const res = {};

    const mockProduct = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }

    before(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'getAllProducts').resolves(mockProduct);
    });

    after(() => {
      serviceProducts.getAllProducts.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await controllerProducts.productIdList(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um objeto', async () => {
      await controllerProducts.productIdList(req, res);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('se objeto têm as propriedades id: 1, name: "Martelo de Thor" e quantity: 10', async () => {
      await controllerProducts.productIdList(req, res);
      expect(res.json.calledWith(sinon.match(mockProduct))).to.be.equal(true);
    });
  });
}) 