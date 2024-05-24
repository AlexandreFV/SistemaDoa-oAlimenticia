const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const Doador = require('./usuariodoador'); // Importando o modelo Doador
const Intermediario = require('./usuarioIntermediario'); // Importando o modelo Doador

const produtoCompradoOriginal = sequelize.define('produtoComprado', {
    nome_alimento: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    
      foto: {
        type: DataTypes.BLOB('medium'),
        allowNull: false
      },
    
      rua: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
      numero: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
      cidade: {
        type: DataTypes.STRING,
        allowNull: false
      },
    
      validade: {
        type: DataTypes.DATE,
        allowNull: false
      },
    
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dataColeta: {
        type: DataTypes.DATE,
        allowNull: true
      }, preco:{
        type:DataTypes.FLOAT,
        allowNull: false,
      },
      formato:{
        type:DataTypes.STRING,
        allowNull:false,
      },

});

produtoCompradoOriginal.belongsTo(Doador); 
produtoCompradoOriginal.belongsTo(Intermediario); 

// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
/*doacaoColetada.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
  }).catch(error => {
    console.error('Erro ao criar tabela:', error);
  });*/
  

module.exports = produtoCompradoOriginal;
