const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const intermediario = require('./usuarioIntermediario'); // Importando o modelo Doador
const Empresa = require('./usuarioEmpresa'); // Importando o modelo Doador

const Intermediario = require('./usuarioIntermediario'); // Importando o modelo Doador

const HistoricoContribuicao = sequelize.define('HistoricoContribuicao', {
    Valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentIntentId:{
        type: DataTypes.STRING,
        allowNull: false,
      }
});

HistoricoContribuicao.belongsTo(Empresa); 
HistoricoContribuicao.belongsTo(intermediario); 

// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
/*HistoricoContribuicao.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
  }).catch(error => {
    console.error('Erro ao criar tabela:', error);
  });*/
  

module.exports = HistoricoContribuicao;
