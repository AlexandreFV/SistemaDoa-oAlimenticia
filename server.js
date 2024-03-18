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
const usuariodoador = require("./models/usuariodoador");
const usuariointermediario = require("./models/usuarioIntermediario");
const doacao = require("./models/doacao");
const e = require('express');

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


  const verificarUsuarioDoador = async (req, res, next) => {
    // Verifique se o usuário está autenticado
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ mensagem: 'Acesso não autorizado. Faça login para acessar esta rota.' });
    }
  
    // Verifique se o token é válido
    try {
      const secret = process.env.SECRET;
      const decodedToken = jwt.verify(token, secret);
  
      // Verifique se o usuário é do tipo usuariodoador
      const userId = decodedToken.id;
      const userEmail = decodedToken.email;
      const user = await usuariodoador.findOne({ where: { id: userId, email: userEmail } });

      if (!user) {
        return res.status(403).json({ mensagem: 'Acesso proibido. Você não tem permissão para acessar esta rota.' });
      }
  
      // Se o usuário estiver autenticado e for do tipo usuariodoador, prossiga para a próxima função de rota
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };

// Aplique o Middleware às Rotas Protegidas
app.get('/MinhasDoacoes', verificarUsuarioDoador, function(req, res) {
  // Se o middleware passou, significa que o usuário está autenticado e autorizado para acessar esta rota
  res.status(200).json({ mensagem: 'Você está autorizado a acessar esta rota.' });
});


app.post("/CadastrarBeneficiario", async function(req, res){
    const { nome, email, cpf, senha } = req.body;

    if (!nome || !email || !cpf || !senha) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try{

      // Verifique se o e-mail já está em uso por qualquer tipo de usuário
      const [doador, intermediario, beneficiario] = await Promise.all([
        usuariodoador.findOne({ where: { email: email } }),
        usuariointermediario.findOne({ where: { email: email } }),
        usuariobeneficiario.findOne({ where: { email: email } })
      ]);

     if (doador || intermediario || beneficiario) {
      return res.status(422).json({ msg: 'E-mail já está em uso por outro usuário!' });
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

});




app.post("/CadastrarDoador", async function(req, res){
  const { nome, email, cpf, senha } = req.body;

  if (!nome || !email || !cpf || !senha) {
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  try{

    // Verifique se o e-mail já está em uso por qualquer tipo de usuário
    const [doador, intermediario, beneficiario] = await Promise.all([
      usuariodoador.findOne({ where: { email: email } }),
      usuariointermediario.findOne({ where: { email: email } }),
      usuariobeneficiario.findOne({ where: { email: email } })
    ]);

  if (doador || intermediario || beneficiario) {
    return res.status(422).json({ msg: 'E-mail já está em uso por outro usuário!' });
  }

      // Crie um hash da senha usando bcrypt
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  
   // Crie um novo usuário usando o modelo usuariobeneficiario
   const newUser = await usuariodoador.create({
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

});


app.post("/CadastrarIntermediario", async function(req, res){
  const { nome, email, cnpj, senha } = req.body;

  if (!nome || !email || !cnpj || !senha) {
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
  }

  try{

   // Verifique se o e-mail já está em uso por qualquer tipo de usuário
   const [doador, intermediario, beneficiario] = await Promise.all([
    usuariodoador.findOne({ where: { email: email } }),
    usuariointermediario.findOne({ where: { email: email } }),
    usuariobeneficiario.findOne({ where: { email: email } })
  ]);

  if (doador || intermediario || beneficiario) {
    return res.status(422).json({ msg: 'E-mail já está em uso por outro usuário!' });
  }
  
      // Crie um hash da senha usando bcrypt
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  
   // Crie um novo usuário usando o modelo usuariobeneficiario
   const newUser = await usuariointermediario.create({
    nome,
    email,
    senha: passwordHash, // Use o hash da senha
    cnpj,
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){

    res.status(500).json({msg: error})
    res.status(500).json({ msg: "Erro ao cadastrar Intermediario", error: error.message });

  }

});



app.get("/", checkToken, async function(req, res) {
  try {
    // Obtenha o e-mail do usuário do objeto de solicitação
    const userEmail = req.userEmail;

    // Consulte o banco de dados para verificar em qual tabela o usuário está presente
    const doador = await usuariodoador.findOne({ where: { email: userEmail } });
    const intermediario = await usuariointermediario.findOne({ where: { email: userEmail } });
    const beneficiario = await usuariobeneficiario.findOne({ where: { email: userEmail } });

     // Verifique em qual tabela o usuário está presente
     if (doador) {
      // Se o usuário estiver na tabela usuariodoador
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'doador', nome: doador.nome, email: doador.email });
    } else if (intermediario) {
      // Se o usuário estiver na tabela usuariointermediario
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'intermediario', nome: intermediario.nome, email: intermediario.email });
    } else if (beneficiario) {
      // Se o usuário estiver na tabela usuariobeneficiario
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'beneficiario', nome: beneficiario.nome, email: beneficiario.email });
    } else {
      // Se o usuário não for encontrado em nenhuma das tabelas
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).json({ msg: 'Ocorreu um erro ao buscar informações do usuário' });
  }
});


app.post("/EntrarBeneficiario", async function(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: 'Por favor, forneça Email e senha.' });
  }

  try {
    const user = await usuariobeneficiario.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha inválida!' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id, email: user.email }, secret);

    return res.status(200).json({ msg: 'Autenticação bem-sucedida', token });
  } catch (error) {
    console.error('Erro:', error); // Log do erro específico
    return res.status(500).json({ msg: 'Ocorreu um erro ao autenticar o usuário' });
  }
});




app.post("/EntrarDoador", async function(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: 'Por favor, forneça email e senha.' });
  }

  try {
    const user = await usuariodoador.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha inválida!' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id, email: user.email }, secret);

    return res.status(200).json({ msg: 'Autenticação bem-sucedida', token });
  } catch (error) {
    console.error('Erro:', error); // Log do erro específico
    return res.status(500).json({ msg: 'Ocorreu um erro ao autenticar o usuário' });
  }
});




app.post("/EntrarIntermediario", async function(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: 'Por favor, forneça email e senha.' });
  }

  try {
    const user = await usuariointermediario.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha inválida!' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id, email: user.email }, secret);

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
          
          req.userEmail = decodedToken.email; // Extrai o e-mail do token decodificado
          req.userId = decodedToken.id; // Extrai o e-mail do token decodificado

          next();
         }catch(error){
          res.status(400).json({msg: "Token Invalido"});
         }

}

app.listen(3001, () => {

    console.log("Servidor rodando na rota 3001");
})


app.post("/EnviarDoacao", async function(req, res) {
  const { nome_alimento, quantidade, foto, endereco } = req.body;

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const usuariodoadorId = decodedToken.id;

    const novaDoacao = await doacao.create({
      nome_alimento: nome_alimento,
      quantidade: quantidade,
      foto: foto,
      endereco: endereco,
      usuariodoadorId: usuariodoadorId  // Incluindo o ID do usuário na criação da doação
    });

    // Se a doação for criada com sucesso, envie uma resposta de sucesso
    res.status(201).json({ message: "Doação criada com sucesso", doacao: novaDoacao });
  } catch (error) {
    // Se ocorrer algum erro durante a criação da doação, envie uma resposta de erro
    res.status(500).json({ error: "Erro ao criar doação", message: error.message });
  }
});


app.get("/MinhasDoacoes/:usuariodoadorId", checkToken, verificarUsuarioDoador, async function(req, res) {
  const usuariodoadorId = req.params.usuariodoadorId;

  try {
    const doacoes = await doacao.findAll({ where: { usuariodoadorId: usuariodoadorId } });
    res.status(200).json({ doacoes: doacoes });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doações por usuário", message: error.message });
  }
});