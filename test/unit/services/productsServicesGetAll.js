const sinon = require('sinon');
const { expect } = require('chai');
const serviceProducts = require('../../../services/productsService');
const modelProducts = require('../../../models/productsModel');


describe('Testa ao chamar o controller de getAllProducts', () => {
  describe('No retorno do banco de dados', () => {
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
      sinon.stub(modelProducts, 'getAll').resolves(mockProducts);
    });

    after(() => {
      modelProducts.getAll.restore();
    });

    it('se existe um array com todos os produtos presentes no banco de dados', async () => {
      const dataProducts = await serviceProducts.getAllProducts();
      expect(dataProducts).to.be.equal(mockProducts);
    });
  });
});
