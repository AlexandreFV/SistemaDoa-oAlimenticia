const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const Doador = require('./usuariodoador'); // Importando o modelo Doador

const RankingVendaUnitario = sequelize.define('RankingVendaUnitario', {
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    
    
});

RankingVendaUnitario.belongsTo(Doador); 

// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
/*RankingVendaUnitario.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
  }).catch(error => {
    console.error('Erro ao criar tabela:', error);
  });*/
  

module.exports = RankingVendaUnitario;
