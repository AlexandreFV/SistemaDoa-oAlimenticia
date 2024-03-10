require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Use o middleware cors
app.use(cors());

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

const usuariobeneficiario = require("./models/usuarioBeneficiario");

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // Host do banco de dados
    user: 'root', // Usuário do banco de dados
    password: '', // Senha do banco de dados
    database: 'teste' // Nome do banco de dados
  });

  // Estabelecer conexão com o banco de dados
connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL');
  });


  app.post("/CadastrarBeneficiario", async function(req, res){
    const { nome, email, cpf, senha } = req.body;

    try{
    // Verifique se o usuário já existe pelo CPF
    const userExists = await usuariobeneficiario.findOne({ where: { cpf: cpf } });

    if(userExists){

      return res.status(422).json({msg: 'Usuario já existe!'})
    }
    
        // Crie um hash da senha usando bcrypt
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);
    
     // Crie um novo usuário usando o modelo usuariobeneficiario
     const newUser = await usuariobeneficiario.create({
      nome,
      email,
      senha: passwordHash, // Use o hash da senha
      cpf,
  });


  res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });

    } catch (error){

      res.status(500).json({msg: error})
      res.status(500).json({ msg: "Erro ao cadastrar beneficiário", error: error.message });

    }

    /*
    // Executar a consulta SQL
    connection.query(sql, values, function(error, results, fields){
        if (error) {
            console.error("Erro ao inserir beneficiário:", error);
            res.status(500).send("Erro ao inserir beneficiário");
            return;
        }
        
        console.log("Beneficiário cadastrado com sucesso!");
        res.status(200).send("Beneficiário cadastrado com sucesso!");
    });*/
});

app.get("/", checkToken, async function(req, res) {
  try {
    // Obtenha o ID do usuário do objeto de solicitação
    const userId = req.userId;

    // Consulte o banco de dados para obter as informações do usuário
    const user = await usuariobeneficiario.findOne({ where: { id: userId } });

    // Verifique se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Envie a resposta com o nome do usuário incluído
    res.status(200).json({ msg: 'Página inicial', nome: user.nome, email: user.email });
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).json({ msg: 'Ocorreu um erro ao buscar informações do usuário' });
  }
});


app.post("/EntrarBeneficiario", async function(req, res) {
  const { cpf, senha } = req.body;

  if (!cpf) {
    return res.status(422).json({ msg: 'cpf obrigatório' });
  }
  if (!senha) {
    return res.status(422).json({ msg: 'senha obrigatória' });
  }

  try {
    const user = await usuariobeneficiario.findOne({ where: { cpf: cpf } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha inválida!' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id }, secret);

    return res.status(200).json({ msg: 'Autenticação bem-sucedida', token });
  } catch (error) {
    console.error('Erro:', error); // Log do erro específico
    return res.status(500).json({ msg: 'Ocorreu um erro ao autenticar o usuário' });
  }
});



function checkToken (req, res, next){

         const authHeader = req.headers['authorization'];
         const token = authHeader && authHeader.split(" ")[1];

         if(!token){
          return res.status(401).json({msg: 'Acesso negado'});
         }

         try{

          const secret = process.env.SECRET;
          const decodedToken = jwt.verify(token, secret);

          req.userId = decodedToken.id;

          next();
         }catch(error){
          res.status(400).json({msg: "Token Invalido"});
         }

}

app.listen(3001, () => {

    console.log("Servidor rodando na rota 3001");
})