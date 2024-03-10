const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste','root','',{
    host:"localhost", 
    dialect:'mysql'
})

const Doador = require('./usuariodoador'); // Importando o modelo Doador

const doacao = sequelize.define('doacao', {
    nome_alimento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


// Defina a relação entre Doador e Doacao
Doador.hasMany(doacao); // Um doador pode ter várias doações
doacao.belongsTo(Doador); // Uma doação pertence a apenas um doador

// Sincronizar o modelo com o banco de dados e criar a tabela, forçando a recriação se já existir
/*doacao.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
  }).catch(error => {
    console.error('Erro ao criar tabela:', error);
  });*/
  
module.exports = doacao;
