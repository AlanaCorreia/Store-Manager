const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const controllerProducts = require('../../../controllers/productsController');

describe('Testa ao chamar o controller de productsList', () => {
  describe('Quando existe o produto no banco de dados', () => { 
    const req = {};
    const res = {};

    const mockProducts = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América",
          "quantity": 30
        }
      ]

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'getAllProducts').resolves(mockProducts);
    });

    after(() => {
      serviceProducts.getAllProducts.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um array contendo a lista de produtos', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('que o array contem objetos com os produtos', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.json.calledWith(mockProducts)).to.be.equal(true);;
    });
  });
  
  describe('Quando não existe o produtos no banco de dados', () => { 
    const req = {};
    const res = {};

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(serviceProducts, 'getAllProducts').resolves([]);
    });

    after(() => {
      serviceProducts.getAllProducts.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um array', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('o array é vazio', async () => {
      await controllerProducts.productsList(req, res);
      expect(res.json.calledWith([])).to.be.equal(true);
    });
  });
})