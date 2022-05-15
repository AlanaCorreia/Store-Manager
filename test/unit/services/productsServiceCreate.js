const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const modelProducts = require('../../../models/productsModel');


describe('Testa ao chamar o service com a createProduct', () => {
  describe('Quando o produto é criado com sucesso no banco de dados', () => {
    const mockProduct = {
      "id": 4,
      "name": "Manopla do infinito",
      "quantity": 10,
    };

    before(() => {
      sinon.stub(modelProducts, 'getProductByName').resolves([]);
      sinon.stub(modelProducts, 'createProduct').resolves(mockProduct);
    });

    after(() => {
      modelProducts.createProduct.restore();
      modelProducts.getProductByName.restore();
    });

    it('é um object', async () => {
      const dataProducts = await serviceProducts.createProduct("Manopla do infinito", 10);
      expect(dataProducts).to.be.a('object');
    });

    it('que contem as chaves id, name e quantity', async () => {
      const dataProducts = await serviceProducts.createProduct("Manopla do infinito", 10);
      expect(dataProducts).to.have.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Quando já existe o produto com o nome fornecido no banco de dados', () => {
    const mockProductGetByName = [{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10,
    }]

    before(() => {
      sinon.stub(modelProducts, 'getProductByName').resolves(mockProductGetByName);
    });

    after(() => {
      modelProducts.getProductByName.restore();
    });

    it('é chamado um objeto', async () => {
      try {
        await serviceProducts.createProduct('Martelo de Thor', 15);
      } catch (error) {
        expect(error).to.be.a('object');
      }
    });
   
    it('é chamado um objeto com o código 409', async () => {
      try {
        await serviceProducts.createProduct('Martelo de Thor', 15);
      } catch (error) {
        expect(error.status).to.be.equal(409);
      }
    });

    it('é chamado um objeto com a mensagem de erro', async () => {
      try {
        await serviceProducts.createProduct('Martelo de Thor', 15);
      } catch (error) {
        expect(error.message).to.be.equal('Product already exists');
      }
    });
  });
});
