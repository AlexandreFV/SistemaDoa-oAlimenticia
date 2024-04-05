const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const Intermediario = require('./usuarioIntermediario'); // Importando o modelo Doador
const DoacaoColetada = require ("./DoacaoColetada");
const usuarioBeneficiario = require("./usuarioBeneficiario");
const DoacaoIntermParaBenef = sequelize.define('DoacaoIntermParaBenef', {
      

});

DoacaoIntermParaBenef.belongsTo(DoacaoColetada); 
DoacaoIntermParaBenef.belongsTo(Intermediario); 
DoacaoIntermParaBenef.belongsTo(usuarioBeneficiario);
// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
/*DoacaoIntermParaBenef.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
  }).catch(error => {
    console.error('Erro ao criar tabela:', error);
  });*/
  

module.exports = DoacaoIntermParaBenef;
