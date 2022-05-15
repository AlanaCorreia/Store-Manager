const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const modelProducts = require('../../../models/productsModel');


describe('Testa ao chamar o service com a getById', () => {
  describe('Quando existe o produto no banco de dados', () => {
    const mockProduct = [{
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }];

    before(() => {
      sinon.stub(modelProducts, 'getById').resolves(mockProduct);
    });

    after(() => {
      modelProducts.getById.restore();
    });

    it('é um array', async () => {
      const dataProducts = await serviceProducts.getById(1);
      expect(dataProducts).to.be.a('array');
    });

    it('se contem um objeto com o produto selecionado', async () => {
      const [dataProducts] = await serviceProducts.getById();
      expect(dataProducts).to.be.a('object');
    });
  });

  describe('Quando não existe o produto no banco de dados', () => {
    before(() => {
      sinon.stub(modelProducts, 'getById').resolves([]);
    });

    after(() => {
      modelProducts.getById.restore();
    });

    it('é chamado um objeto com o código 404', async () => {
      try {
        await serviceProducts.getById(20);
      } catch (error) {
        expect(error.status).to.be.equal(404);
      }
    });

    it('é chamado um objeto com a mensagem de erro', async () => {
      try {
        await serviceProducts.getById(20);
      } catch (error) {
        expect(error.message).to.be.equal('Product not found');
      }
    });
  });
});
