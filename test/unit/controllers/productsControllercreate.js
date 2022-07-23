const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const controllerProducts = require('../../../controllers/productsController');

describe('Testa ao chamar o controller de createProduct', () => {
  describe('Quando o produto é criado com sucesso no banco de dados', () => { 
    const req = {};
    const res = {};

    const result = {
      "id": 4,
      "name": "Manopla do infinito",
      "quantity": 10,
    };

    before(() => {
      req.body = {
        name: "Manopla do infinito",
        quantity: 10,
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'createProduct').resolves(result);
    });

    after(() => {
      serviceProducts.createProduct.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await controllerProducts.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com objeto contendo o produto criado', async () => {
      await controllerProducts.createProduct(req, res);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      expect(res.json.calledWith(result)).to.be.equal(true);
    });
  });

  describe('Quando o nome do produto já existe no banco de dados', () => { 
    const req = {};
    const res = {};
    const next = () => {};

    const erro = {status: 409, message: 'Product already exists'}

    before(() => {
      req.body = {
        name: "Martelo de Thor",
        quantity: 15,
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'createProduct').throws(erro);
    });

    after(() => {
      serviceProducts.createProduct.restore();
    });

    it('é chamado o status com o código 409', async () => {
      try {
        await controllerProducts.createProduct(req, res, next);
      } catch (error) {
        expect(error.status.calledWith(409)).to.be.equal(true);
      }
      
    });

    it('é chamado o json com um objeto de erro', async () => {
      try {
        await controllerProducts.createProduct(req, res, next);
      } catch (error) {
        expect(error.message.calledWith('Product already exists')).to.be.equal(true);
      }     
    });
  });
});
