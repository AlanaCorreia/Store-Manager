const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const modelProducts = require('../../../models/productsModel');

describe('Testa ao chamar a função getAll da camada de modelo', () => {
  describe('No retorno do banco de dados', () => {

    const executeProducts = [
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

    before(async () => {
      sinon.stub(connection, 'execute').resolves([executeProducts]);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('se existe um array', async () => {
      const dataProducts = await modelProducts.getAll();
      expect(dataProducts).to.be.an('array');
    });

    it('se no array contém objetos', async () => {
      const [dataProducts] = await modelProducts.getAll();
      expect(dataProducts).to.be.an('object');
    });

    it('que o array contem objetos com as chaves id, name e quantity', async () => {
      const [dataProducts] = await modelProducts.getAll();
      expect(dataProducts).to.have.all.keys('id', 'name', 'quantity');
    });
  });
});