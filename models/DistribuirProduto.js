const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const beneficiário = require('./usuarioBeneficiario'); // Importando o modelo Doador
const Intermediario = require('./usuarioIntermediario'); // Importando o modelo Doador
const ProdutoComprado = require('./ProdutoComprado'); // Importando o modelo Doador

const DistribuirProduto = sequelize.define('DistribuirProduto', {
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
});

DistribuirProduto.belongsTo(beneficiário); 
DistribuirProduto.belongsTo(Intermediario); 
DistribuirProduto.belongsTo(ProdutoComprado); 

// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
/*DistribuirProduto.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
  }).catch(error => {
    console.error('Erro ao criar tabela:', error);
  });*/
  

module.exports = DistribuirProduto;
