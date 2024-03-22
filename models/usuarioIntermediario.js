const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const usuariointermediario = sequelize.define('usuariointermediario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
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
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
// usuariointermediario.sync({ force: true }).then(() => {
//     console.log('Tabela criada com sucesso.');
//   }).catch(error => {
//     console.error('Erro ao criar tabela:', error);
//   });
  
module.exports = usuariointermediario;
