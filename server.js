require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const { Sequelize, where } = require('sequelize');
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var smtpPool = require('nodemailer-smtp-pool');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = "whsec_3c9585386e4c4471c1f88efa04be199e3e2c2e2c34211adddfc8318605b69088";

const usuariobeneficiario = require("./models/usuarioBeneficiario"); //Tabela que armazena as informacoes de beneficiario
const usuariodoador = require("./models/usuariodoador"); //Tabela que armazena as informacoes de doador
const usuariointermediario = require("./models/usuarioIntermediario"); //Tabela que armazena as informacoes de intermediario
const doacaoColetada = require("./models/DoacaoColetada"); //Tabela que armazena as informacoes dos produtos dos intermediarios disponiveis para serem doados
const DoacaoIntermParaBenef = require("./models/DoacaoIntermParaBenef");
const doacao = require("./models/doacao"); //Tabela que armazena as informacoes dos produtos ainda disponiveis para compra
const usuarioEmpresa = require("./models/usuarioEmpresa"); //Tabela que armazena as informacoes de empresa
const DistribuirProduto = require("./models/DistribuirProduto"); //Tabela que armazena as informacoes de distribuicao de um determinado produto comprado pelo intermediario, dados inalteraveis
const produtoCompradoOriginal = require('./models/ProdutoComprado');  //Tabela que armazena as informacoes de registro da compra, são dados inalteraveis para registro
const rankingProdUnit = require("./models/RankingVendaUnitario");
const SMTPPool = require('nodemailer/lib/smtp-pool');
const { Html } = require('next/document');
const Transacao = require("./models/HistoricoContribuicao");

  // Configurações de conexão com o banco de dados
const connection = mysql.createPool({ 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste',
  port: 3306

});

const sequelize = new Sequelize('teste', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`⚠️  Falha na verificação da assinatura do webhook: ${err.message}`);
    return res.sendStatus(400);
  }

  // Lidar com o evento
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // Verifique o metadata para determinar o tipo de sessão (venda de produto ou doacao Monetaria)
      if (session.metadata && session.metadata.doacaoId) {
        // Lógica para venda de produto
        const doacaoId = session.metadata.doacaoId; //id Do produto Vendido
        const usuarioId = session.metadata.usuarioId; //Id do usuario que vai receber o pagamento
        handleProductSale(doacaoId,usuarioId);

      } else if (session.metadata && session.metadata.doacaoMonetaria) {
        handleDonation(session);
      }
      break;
    // Adicione outros casos para lidar com diferentes tipos de eventos se necessário
    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  // Retorne uma resposta 200 para reconhecer que recebemos o evento
  res.json({ received: true });
});




// Use o middleware cors
app.use(cors());
// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());
app.use(express.static('public'));

connection.getConnection((err, connection)=> {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }

  console.log('Conexão bem-sucedida como ID ' + connection.threadId);
  // Agora você pode executar consultas SQL usando esta conexão
  //Comentar apos a criação das tabelas
  //sincronizarTabela();
  connection.release();
});

async function sincronizarTabela() {
  try {
    const tabelas = await sequelize.getQueryInterface().showAllTables();
    for (const tabela of tabelas) {
      await sequelize.getQueryInterface().dropTable(tabela);
      console.log(`Tabela ${tabela} excluída com sucesso.`);
    }

    await usuariobeneficiario.sync({force : true});
    await usuarioEmpresa.sync({force : true});
    await usuariodoador.sync({force : true});
    await usuariointermediario.sync({force : true});
    await doacao.sync({force : true});
    await doacaoColetada.sync({force : true});
    await DoacaoIntermParaBenef.sync({force : true});
    await produtoCompradoOriginal.sync({force : true});
    await DistribuirProduto.sync({force : true});
    await rankingProdUnit.sync({force: true});
    await Transacao.sync({force: true});
    
    console.log('Tabela sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar tabela:', error);
  }
}


  const upload = multer({
    storage: multer.memoryStorage(), // Isso irá armazenar o arquivo em buffer na memória
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


  const verificarUsuarioIntermediario = async (req, res, next) => {
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
      const user = await usuariointermediario.findOne({ where: { id: userId, email: userEmail } });

      if (!user) {
        return res.status(403).json({ mensagem: 'Acesso proibido. Você não tem permissão para acessar esta rota.' });
      }
  
      // Se o usuário estiver autenticado e for do tipo usuariodoador, prossiga para a próxima função de rota
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };

  const verificarUsuarioEmpresa = async (req, res, next) => {
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
  
      // Verifique se o usuário é do tipo empresa
      const userId = decodedToken.id;
      const userEmail = decodedToken.email;
      const user = await usuarioEmpresa.findOne({ where: { id: userId, email: userEmail } });

      if (!user) {
        return res.status(403).json({ mensagem: 'Acesso proibido. Você não tem permissão para acessar esta rota.' });
      }
  
      // Se o usuário estiver autenticado e for do tipo empresa, prossiga para a próxima função de rota
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };

  const verificarUsuarioBeneficiario = async (req, res, next) => {
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
  
      // Verifique se o usuário é do tipo beneficiario
      const userId = decodedToken.id;
      const userEmail = decodedToken.email;
      const user = await usuariobeneficiario.findOne({ where: { id: userId, email: userEmail } });

      if (!user) {
        return res.status(403).json({ mensagem: 'Acesso proibido. Você não tem permissão para acessar esta rota.' });
      }
  
      // Se o usuário estiver autenticado e for do tipo beneficiario, prossiga para a próxima função de rota
      next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };



// Aplique o Middleware às Rotas Protegidas
app.get('/MinhasDoacoes',checkToken, verificarUsuarioDoador, function(req, res) {
  // Se o middleware passou, significa que o usuário está autenticado e autorizado para acessar esta rota
  res.status(200).json({ mensagem: 'Você está autorizado a acessar esta rota.' });
});


app.post("/CadastrarBeneficiario", async function(req, res){
    const { nome, email, cpf, senha, rua, cidade, numero,telefone} = req.body;

    if (!nome || !email || !cpf || !senha || !rua || !cidade || !numero || !telefone ) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try{

    // Verifique se o e-mail já está em uso por qualquer tipo de usuário
    const [doador, intermediario, beneficiario, empresa] = await Promise.all([
      usuariodoador.findOne({ where: { email: email } }),
      usuariointermediario.findOne({ where: { email: email } }),
      usuariobeneficiario.findOne({ where: { email: email } }),
      usuarioEmpresa.findOne({ where: { email: email } })
    ]);

     if (doador || intermediario || beneficiario || empresa) {
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
      rua,
      cidade,
      numero,
      telefone
  });

  res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


    } catch (error){

      res.status(500).json({msg: error})
      res.status(500).json({ msg: "Erro ao cadastrar beneficiário", error: error.message });

    }

});


app.post("/CadastrarDoador", async function(req, res){
  const { nome, email, cpf, senha,rua,cidade,numero,telefone,NumerAgen,NumerConta,dataNasc,selectedBank   } = req.body;

  if (!nome || !email || !cpf || !senha || !rua || !cidade || !numero || !telefone || !NumerAgen || !NumerConta 
    || !dataNasc || !selectedBank) {
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
  }

    // Separando a data de nascimento em dia, mês e ano
    const [anoNasc, mesNasc, diaNasc] = dataNasc.split('-');

  try{

    // Verifique se o e-mail já está em uso por qualquer tipo de usuário
    const [doador, intermediario, beneficiario, empresa] = await Promise.all([
      usuariodoador.findOne({ where: { email: email } }),
      usuariointermediario.findOne({ where: { email: email } }),
      usuariobeneficiario.findOne({ where: { email: email } }),
      usuarioEmpresa.findOne({ where: { email: email } })
    ]);

  if (doador || intermediario || beneficiario || empresa) {
    return res.status(422).json({ msg: 'E-mail já está em uso por outro usuário!' });
  }

  const resultadoCriacaoStripe = await CriarProdutorIntermedStripe(nome, email, cpf, rua, cidade, telefone, NumerAgen, NumerConta, anoNasc, mesNasc, diaNasc, selectedBank);
  
  if (!resultadoCriacaoStripe) {
    return res.status(500).json({ msg: 'Erro ao criar conta na Stripe.' });
  }
//         // Crie um hash da senha usando bcrypt
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  
   // Crie um novo usuário usando o modelo usuariobeneficiario
   const newUser = await usuariodoador.create({
    nome,
    email,
    senha: passwordHash, // Use o hash da senha
    cpf,
    rua,
    numero,
    cidade,
    telefone,
    idStripe: resultadoCriacaoStripe.conta.id,
    idCliente: resultadoCriacaoStripe.cliente.id,
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){

    res.status(500).json({ msg: "Erro ao cadastrar Produtor", error: error.message });

  }

});


const CriarProdutorIntermedStripe = async (nome, email, cpf, rua, cidade, telefone, NumerAgen, NumerConta, anoNasc, mesNasc, diaNasc, selectedBank) => {
  // 1. Coletar informações bancárias durante o cadastro do usuário
  const bankAccountInfo = {
    country: 'BR',
    currency: 'brl',
    account_holder_name: nome,
    account_holder_type: 'individual',
    routing_number: "110-0000", // Para contas do brasil o cod de compensasao + cod da agencia, para testes, apenas 110-0000, para producao selectedBank + NumerAgen
    account_number: "0001234", // Número da conta, para testes, apenas 0001234, para producao NumerConta
  };
  
// 2. Criar um token da conta bancária
const bankAccountToken = await stripe.tokens.create({
  bank_account: bankAccountInfo,
});

  // 3. Criar a conta na Stripe com o token da conta bancária
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'BR',
    email: email,
    external_account: bankAccountToken.id,
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
    business_type: 'individual', // Tipo de empresa (pessoa física)
    business_profile: {
      mcc: '5734', // MCC para o setor de Software
      url: 'https://www.exemplo.com', // Site da empresa
    },
    individual: {
      address: {
        city: cidade,
        line1: rua,
        postal_code: '15906762',
        state: 'São Paulo',
      },
      dob: {
        day: diaNasc,
        month: mesNasc,
        year: anoNasc,
      },
      email: email,
      first_name: 'Alexandre',
      last_name: 'Santos',
      id_number: cpf,
      phone: '+55' + telefone,
    },  
  });
    
  const customer = await stripe.customers.create({
    email: email,
    name: nome,
    metadata: {
      usuarioId: account.id, // Usando o ID da conta Stripe como metadata para associar o cliente ao produtor intermediário
    },
  });


  const conta = await stripe.accounts.retrieve(account.id);

  if(!conta){
    return null;
  }

  return { conta: account, cliente: customer };

}


app.post("/CadastrarIntermediario", async function(req, res){
  const { nome, email, cnpj, senha,rua,cidade,numero,telefone,NumerAgen,NumerConta,dataNasc,selectedBank   } = req.body;

  if (!nome || !email || !cnpj || !senha || !rua || !cidade || !numero || !telefone || !NumerAgen || !NumerConta 
    || !dataNasc || !selectedBank) {
      return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
  }
    // Separando a data de nascimento em dia, mês e ano
    const [anoNasc, mesNasc, diaNasc] = dataNasc.split('-');
  try{

   // Verifique se o e-mail já está em uso por qualquer tipo de usuário
   const [doador, intermediario, beneficiario, empresa] = await Promise.all([
    usuariodoador.findOne({ where: { email: email } }),
    usuariointermediario.findOne({ where: { email: email } }),
    usuariobeneficiario.findOne({ where: { email: email } }),
    usuarioEmpresa.findOne({ where: { email: email } })

  ]);

  if (doador || intermediario || beneficiario || empresa) {
    return res.status(422).json({ msg: 'E-mail já está em uso por outro usuário!' });
  }

  const resultadoCriacaoStripe = await CriarProdutorIntermedStripe(nome, email, cnpj, rua, cidade, telefone, NumerAgen, NumerConta, anoNasc, mesNasc, diaNasc, selectedBank);
  
  if (!resultadoCriacaoStripe) {
    return res.status(500).json({ msg: 'Erro ao criar conta na Stripe.' });
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
    rua,
    numero,
    cidade,
    telefone,
    idStripe: resultadoCriacaoStripe.conta.id,
    idCliente: resultadoCriacaoStripe.cliente.id,
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){

    res.status(500).json({ msg: "Erro ao cadastrar Intermediario", error: error.message });

  }

});

app.post("/CadastrarEmpresa", async function(req, res){
  const { nome, email, cnpj, senha, rua, cidade, numero, telefone,NumerAgen,NumerConta,dataNasc,selectedBank   } = req.body;

  if (!nome || !email || !cnpj || !senha || !rua || !cidade || !numero || !telefone || !NumerAgen || !NumerConta 
    || !dataNasc || !selectedBank) {
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
  }
  const [anoNasc, mesNasc, diaNasc] = dataNasc.split('-');

  try{

   // Verifique se o e-mail já está em uso por qualquer tipo de usuário
   const [doador, intermediario, beneficiario,empresa ] = await Promise.all([
    usuariodoador.findOne({ where: { email: email } }),
    usuariointermediario.findOne({ where: { email: email } }),
    usuariobeneficiario.findOne({ where: { email: email } }),
    usuarioEmpresa.findOne({ where: { email: email } })
  ]);

  if (doador || intermediario || beneficiario || empresa) {
    return res.status(422).json({ msg: 'E-mail já está em uso por outro usuário!' });
  }

  const resultadoCriacaoStripe = await CriarProdutorIntermedStripe(nome, email, cnpj, rua, cidade, telefone, NumerAgen, NumerConta, anoNasc, mesNasc, diaNasc, selectedBank);
  
  if (!resultadoCriacaoStripe) {
    return res.status(500).json({ msg: 'Erro ao criar conta na Stripe.' });
  }
  
      // Crie um hash da senha usando bcrypt
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);
  
   // Crie um novo usuário usando o modelo usuarioEmpresa
   const newUser = await usuarioEmpresa.create({
    nome,
    email,
    senha: passwordHash, // Use o hash da senha
    cnpj,
    rua,
    numero,
    cidade,
    telefone,
    idStripe: resultadoCriacaoStripe.conta.id,
    idCliente: resultadoCriacaoStripe.cliente.id,
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){
    res.status(500).json({ msg: "Erro ao cadastrar Empresa", error: error.message });
  }
});


app.get("/",checkToken, async function(req, res) {
  try {
    // Obtenha o e-mail do usuário do objeto de solicitação
    const userEmail = req.userEmail;

    // Consulte o banco de dados para verificar em qual tabela o usuário está presente
    const doador = await usuariodoador.findOne({ where: { email: userEmail } });
    const intermediario = await usuariointermediario.findOne({ where: { email: userEmail } });
    const beneficiario = await usuariobeneficiario.findOne({ where: { email: userEmail } });
    const empresa = await usuarioEmpresa.findOne({where: {email: userEmail}});

     // Verifique em qual tabela o usuário está presente
     if (doador) {
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'doador', nome: doador.nome, email: doador.email });
    } else if (intermediario) {
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'intermediario', nome: intermediario.nome, email: intermediario.email });
    } else if (beneficiario) {
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'beneficiario', nome: beneficiario.nome, email: beneficiario.email });
    } else if (empresa) {
      res.status(200).json({ msg: 'Página inicial', tipoUsuario: 'empresa', nome: empresa.nome, email: empresa.email });
    }
     else {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
  } catch (error) {
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
    const userStripeId = user.idStripe;

    return res.status(200).json({ msg: 'Autenticação bem-sucedida', token,userStripeId });
  } catch (error) {
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
    const userStripeId = user.idStripe;

    return res.status(200).json({ msg: 'Autenticação bem-sucedida', token, userStripeId });
  } catch (error) {
    return res.status(500).json({ msg: 'Ocorreu um erro ao autenticar o usuário' });
  }
});

app.post("/EntrarEmpresa", async function(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ msg: 'Por favor, forneça email e senha.' });
  }

  try {
    const user = await usuarioEmpresa.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(422).json({ msg: 'Senha inválida!' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id, email: user.email }, secret);
    const userStripeId = user.idStripe;

    return res.status(200).json({ msg: 'Autenticação bem-sucedida', token,userStripeId });
  } catch (error) {
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


app.post("/EnviarDoacao/:id", upload.single('foto'), checkToken, verificarUsuarioDoador, async function(req, res) {
  const { nome_alimento, quantidade, rua, numero, cidade, validade, descricao,categoria, formato, preco} = req.body;
  const foto = req.file.buffer; // Obtenha os dados binários da imagem
  const usuariodoadorId = req.params.id;

  const usuarioDoador = await usuariodoador.findOne({ where:{
    id: usuariodoadorId,
  }})
  const VerificacaoStripe = await verificarIntegracao(usuarioDoador.idStripe);

  if(VerificacaoStripe){
    return res.status(404).json ({msg: "Usuario não Integrado ao Stripe"});
  }

  try {

    const novaDoacao = await doacao.create({
      nome_alimento: nome_alimento,
      quantidade: quantidade,
      foto: foto,
      usuariodoadorId: usuariodoadorId,  // Incluindo o ID do usuário na criação da doação
      rua: rua,
      numero: numero,
      cidade: cidade,
      validade: validade,
      descricao: descricao,
      categoria: categoria,
      formato: formato,
      preco: preco,
    });

    // Se a doação for criada com sucesso, envie uma resposta de sucesso
    res.status(201).json({ message: "Doação criada com sucesso", doacao: novaDoacao });
  } catch (error) {
    // Se ocorrer algum erro durante a criação da doação, envie uma resposta de erro
    res.status(500).json({ error: "Erro ao criar doação", message: error.message });
  }
});

//Exibe as doacoes que não foram compradas
app.get("/MinhasDoacoes/:usuariodoadorId", checkToken, verificarUsuarioDoador, async function(req, res) {
  const usuariodoadorId = req.params.usuariodoadorId;

  try {
    const doacoes = await doacao.findAll({ where: { usuariodoadorId: usuariodoadorId } });

    // Mapear as doações para incluir as imagens redimensionadas e convertidas em base64
    const doacoesComImagens = await Promise.all(doacoes.map(async (doacao) => {
      // Redimensionar a imagem para 100x100 pixels mantendo a proporção
      const imagemRedimensionada = await sharp(doacao.foto).resize({ width: 1000, height: 1000, fit: 'inside' }).toBuffer();
      const imagemBase64 = imagemRedimensionada.toString('base64');
      
      return { ...doacao.toJSON(), imagemBase64 }; // Incluir a imagem convertida na representação JSON da doação
    }));

    res.status(200).json({ doacoes: doacoesComImagens });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doações por usuário", message: error.message });
  }
});

app.get("/ObterDadosEndereco", checkToken, verificarUsuarioDoador, async function (req, res) {
  const usuariodoadorId = req.userId;

  try {
    const enderecoUsuario = await usuariodoador.findByPk(usuariodoadorId);

      if (enderecoUsuario) {
          // Se os dados do endereço forem encontrados, retorne-os como resposta
          return res.status(200).json(enderecoUsuario);
      } else {
          // Se os dados do endereço não forem encontrados, retorne um erro 404
          return res.status(404).json({ message: "Endereço do usuário não encontrado" });
      }
  } catch (error) {
      // Se ocorrer um erro ao buscar os dados do endereço, retorne um erro 500
      return res.status(500).json({ message: "Erro interno do servidor" });
  }
});


app.get("/ColetarDoacao/:id", checkToken,verificarUsuarioIntermediario, async function(req,res){
    const userId = req.params.id;

  try{
    const usuarioIntermediario = await usuariointermediario.findByPk(userId);
    const cidadeUsuario = usuarioIntermediario.cidade;

    const doacoes = await doacao.findAll({
      include: {
          model: usuariodoador,
          attributes: ['nome', 'telefone'],
          where: {
              cidade: cidadeUsuario // Filtrar doações pela cidade do usuário intermediário
          }
      }
  });
    
      // Converter imagens em formato base64
      const doacoesComImagens = await Promise.all(doacoes.map(async (doacao) => {
        const imagemRedimensionada = await sharp(doacao.foto).resize({ width: 1000, height: 1000, fit: 'inside' }).toBuffer();
        const imagemBase64 = imagemRedimensionada.toString('base64');
        return { ...doacao.toJSON(), imagemBase64 }; // Incluir a imagem convertida na representação JSON da doação
      }));

    res.status(200).json(doacoesComImagens); // Retorna as doações como resposta
  }catch (error) {
    res.status(500).json({ error: "Erro ao buscar doações" }); // Retorna um erro em caso de falha
  }

})

app.get("/InfoProduto/:id", checkToken, verificarUsuarioIntermediario, async function (req, res) {
  const id = req.params.id;

  try {
    // Busca a doação com base no ID fornecido
    const doacaoEncontrada = await doacao.findByPk(id);

    // Verifica se a doação foi encontrada
    if (!doacaoEncontrada) {
      return res.status(404).json({ error: "Doação não encontrada" });
    }

    const doacoes = await doacao.findByPk(id, {
      include: {
        model: usuariodoador, // Substitua 'Doador' pelo nome do seu modelo de doador
        attributes: ['nome','telefone', 'cpf'] // Inclua apenas o nome do doador
      }
    });


    res.status(200).json(doacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doação" });
  }
});

//Para coletar o produto sem pagar no stripe (Para testes)
app.post("/ComprarProdutoSEMPAGAR/:id",checkToken,verificarUsuarioIntermediario, async function (req, res) {
  const id = req.params.id;
  const usuarioId = req.userId;
  try {
      // Encontrar a doação na tabela doacaos com base no ID fornecido
      const doacao1 = await doacao.findByPk(id);
      if (!doacao1) {
          return res.status(404).json({ error: "Doação não encontrada" });
      }
      const dataAtual = new Date();
      const doacaoColetadaValues = {
        nome_alimento: doacao1.nome_alimento,
        quantidade: doacao1.quantidade,
        foto: doacao1.foto,
        rua: doacao1.rua,
        numero: doacao1.numero,
        cidade: doacao1.cidade,
        validade: doacao1.validade,
        descricao: doacao1.descricao,
        categoria: doacao1.categoria,
        dataColeta: dataAtual,
        usuariodoadorId: doacao1.usuariodoadorId,
        usuariointermediarioId:usuarioId,
        formato: doacao1.formato,
        preco: doacao1.preco,
    };
      await doacaoColetada.create(doacaoColetadaValues);
      await produtoCompradoOriginal.create(doacaoColetadaValues);
      let RankingDoador = await rankingProdUnit.findOne({
        where: {
            usuariodoadorId: doacao1.usuariodoadorId
        }
    });
      
      if(!RankingDoador){
        RankingDoador = await rankingProdUnit.create({
          usuariodoadorId: doacao1.usuariodoadorId,
          quantidade: 1, //Inicia com 1 pois é a primeira venda
        });
      }else{
        RankingDoador.quantidade += 1; 
      }
      await RankingDoador.save();
      // Remover a doação encontrada da tabela doacaos
      await doacao1.destroy();
      // Responder ao cliente com sucesso
      res.status(200).json({ message: "Doação coletada com sucesso" });
  } catch (error) {
      res.status(500).json({ error: "Erro ao coletar produto" });
  }
});


app.get("/MeusIntermedios", checkToken, verificarUsuarioIntermediario, async function (req,res){
  res.status(200).json({ mensagem: 'Você está autorizado a acessar esta rota.' });

})

//Exibe os produtos disponiveis para serem doados
app.get("/ListProdutorIntermed", checkToken, verificarUsuarioIntermediario, async function (req, res){
  const usuarioId = req.userId;
  try {

    const meusIntermedios = await doacaoColetada.findAll({ 
      where: { 
        usuariointermediarioId: usuarioId,
        quantidade: {
          [Op.gt]: 0 // Buscar produtos com quantidade maior que 0
        }
      },
      include: { // Incluir informações do doador
        model: usuariodoador, // Nome do modelo do doador
        attributes: ['nome', 'cpf', 'telefone'] // Atributos a serem incluídos
      }
    });    
    
    if (!meusIntermedios || meusIntermedios.length === 0) {
      return res.status(404).json({ error: "Nenhuma doação intermediária encontrada" });
    }

   

    res.status(200).json({ meusIntermedios });
  } catch (error) {
    res.status(500).json({ message: "Erro ao processar a solicitação" });
  }
});


//Exibe os beneficiarios que estejam na mesma cidade para doacao
app.get("/ListarBeneficiario/:id", checkToken, verificarUsuarioIntermediario, async function(req, res) {
  const usuariointermediarioId = req.params.id;
  try {
    const usuarioInterm = await usuariointermediario.findByPk(usuariointermediarioId);
    const usuarioIntermCidade = usuarioInterm.cidade;
    const beneficiariosDispo = await usuariobeneficiario.findAll({
      where: {
      cidade: usuarioIntermCidade,
      }
    })

      res.status(200).json({ beneficiariosDispo });
  } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor." });
  }
});

//Exbie as inforamcoes de uma doacao
app.get("/InfoMinhaDoacao/:id",checkToken, verificarUsuarioDoador, async function (req, res) {
  const id = req.params.id;

  try {
    // Busca a doação com base no ID fornecido
    const doacaoEncontrada = await doacao.findByPk(id, {
      attributes: { exclude: ['foto'] }
    });
    // Verifica se a doação foi encontrada
    if (!doacaoEncontrada) {
      return res.status(404).json({ error: "Doação não encontrada" });
    }

    res.status(200).json(doacaoEncontrada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doação" });
  }
});


app.delete("/ApagarDoacao/:id",checkToken, verificarUsuarioDoador, async function (req,res){
    const id = req.params.id;

    try{

      const doacaoApagar = await doacao.findByPk(id);
      if(!doacaoApagar){
        return res.status(404).json({error:"Doacao Não encontrada!"});
      }
      doacaoApagar.destroy();

      res.status(200).json ({message:"Doação Apagada!"});
    
    } catch (error){
      res.status(500).json ({error:"Erro ao Buscar Doação"});
    }
})

//Exibe os produtos dos doadores que foram comprados e por quem foi comprado
app.get("/MeusProdutosVendidos/:id",checkToken,verificarUsuarioDoador, async function (req,res){
    const userId = req.params.id;

    try{
     
      const vendasRealizadas = await produtoCompradoOriginal.findAll( {
        where: 
        {usuariodoadorId: userId},
        include: {
          model: usuariointermediario,
          attributes: ["nome"],
        } 
      });

      if (vendasRealizadas.length === 0) {
        return res.status(404).json ("Vendas não encontradas");
      }

          // Mapear as doações para incluir as imagens redimensionadas e convertidas em base64
      const vendasComImagem = await Promise.all(vendasRealizadas.map(async (vendas) => {
      // Redimensionar a imagem para 100x100 pixels mantendo a proporção
      const imagemRedimensionada = await sharp(vendas.foto).resize({ width: 1000, height: 1000, fit: 'inside' }).toBuffer();
      const imagemBase64 = imagemRedimensionada.toString('base64');
      
      return { ...vendas.toJSON(), imagemBase64 }; // Incluir a imagem convertida na representação JSON da doação
    }));

      res.status(200).json(vendasComImagem);
    } catch (error){
      res.status(500).json ("Erro ao buscar vendas");
    }
})

//Exibe os produtos disponiveis para serem doados aos beneficiarios
app.get("/ProdutosBenef/:idBenef",checkToken,verificarUsuarioIntermediario, async function (req,res){
    const idIntermed = req.userId;
    const idBenef = req.params.idBenef;

    try{
    const doacoesColetadas = await doacaoColetada.findAll({
      where: 
        {usuariointermediarioId: idIntermed, quantidade: { [Op.gt]: 0 }},
        include: {
        model: usuariointermediario,
        attributes: ['nome','telefone'],
        },
    });  

    if (!doacoesColetadas || doacoesColetadas.length === 0) {
      return res.status(404).json({ error: "Todos os Produtos já foram doados!" });
    }

      // Converter imagens em formato base64
      const doacoesComImagens = await Promise.all(doacoesColetadas.map(async (doacao) => {
        const imagemRedimensionada = await sharp(doacao.foto).resize({ width: 1000, height: 1000, fit: 'inside' }).toBuffer();
        const imagemBase64 = imagemRedimensionada.toString('base64');
        return { ...doacao.toJSON(), imagemBase64 }; // Incluir a imagem convertida na representação JSON da doação
      }));

    res.status(200).json({ doacoesComImagens });

    } catch (error){
    res.status(500).json({ error: "Erro ao buscar doações por usuário", message: error.message });
    }

})

//Envia um produto para um beneficiario
app.post("/EnviarParaBenef", checkToken, verificarUsuarioIntermediario, async function (req, res) {
  const { id, quantidade, idBenef } = req.body;
  const idUser = req.userId;
  try {
      // Iterar sobre os IDs e quantidades recebidos
      for (let i = 0; i < id.length; i++) {
          const idProduto = id[i];
          const quantidadeRecebida = quantidade[i];

          // Encontrar o registro da doação coletada com base no ID do produto
            const doacaoColetada1 = await doacaoColetada.findByPk(idProduto);
          if (doacaoColetada1) {
              // Subtrai a quantidade de produtos disponiveis do registro
              doacaoColetada1.quantidade -= quantidadeRecebida;
              await doacaoColetada1.save();

              await DistribuirProduto.create({
                quantidade: quantidadeRecebida,
                usuariobeneficiarioId: idBenef,
                usuariointermediarioId: idUser,
                produtoCompradoId: idProduto,
              });

              
          } else {
              console.log(`Doação coletada não encontrada para o ID do produto: ${idProduto}`);
              // Tratar o caso em que a doação coletada não foi encontrada para o ID do produto
          }
      }

      // Resposta de sucesso
      res.status(200).json({ message: "Produtos enviados com sucesso para o beneficiário." });
  } catch (error) {
      // Resposta de erro
      res.status(500).json({ error: "Erro ao enviar produtos para o beneficiário." });
  }
});

//Exibe todos os produtos comprados com suas informacoes de compra
app.get("/MeusProdutosComprados/:id", checkToken, verificarUsuarioIntermediario,async function (req,res){
    const id = req.params.id;

    try{

      const produtosComprados = await produtoCompradoOriginal.findAll({
        where: { usuariointermediarioId: id },
        attributes: { exclude: ["foto"] },
        include: {
          model: usuariodoador,
          attributes: ["nome", "telefone", "cpf"]
        }
      });
      

      if(!produtosComprados){
        return res.status(404).json( {error:"Nenhuma Compra Encontrada!"});
      }

      res.status(200).json({produtosComprados})
    }catch (error){
      res.status(500).json({ error: "Erro ao enviar produtos comprados." });
    }
})

//Verifica quais produtos foram distribuidos, para exibir o botão de envios
app.get("/MeusProdutosDistribuidos/:id", checkToken, verificarUsuarioIntermediario, async function (req, res) {
  const id = req.params.id;

  try {
      const produtosDistribuidos = await DistribuirProduto.findAll({ where: { usuariointermediarioId: id },
      include: {
        model: produtoCompradoOriginal,
        attributes: ["preco"],
      } });

      if (!produtosDistribuidos) {
          return res.status(404).json({ error: "Nenhum Produto Distribuído Encontrado!" });
      }
      res.status(200).json({ produtosDistribuidos });
  } catch (error) {
      res.status(500).json({ error: "Erro ao enviar produtos distribuídos." });
  }
});

app.get("/MeusProdutosDisponiveisParaDoacao/:id", checkToken, verificarUsuarioIntermediario, async function (req,res){
  const id = req.params.id;

  try{
    const doacoesColetadas = await doacaoColetada.findAll({
      where: 
        {usuariointermediarioId: id, quantidade: { [Op.gt]: 0 }}});

        if(!doacoesColetadas ||  doacoesColetadas.length === 0){
          return res.status(404).json({doacoesColetadas});
        }
        res.status(200).json({ doacoesColetadas });

    }catch (error){
      res.status(500).json({ error: "Erro ao enviar produtos disponiveis." });
    }
})


app.get("/MeusIntermedios/:id/:idProd",checkToken, verificarUsuarioIntermediario,  async function (req,res){
    const idUser = req.params.id;
    const idProd = req.params.idProd;

    try{

      const meusIntermedios = await DistribuirProduto.findAll({ 
        where: { 
            produtoCompradoId: idProd, 
            usuariointermediarioId: idUser 
        }, 
        include: [
            { 
                model: usuariobeneficiario, 
                attributes: ["nome", "rua", "cidade", "numero", "telefone"] 
            },
            { 
                model: produtoCompradoOriginal, 
                attributes: ["nome_alimento", "descricao", "categoria"] 
            }
        ]
    });
    
      if(!meusIntermedios || meusIntermedios.length === 0){
        return res.status(404).json( {error:"Nenhum Intermedio Encontrado!"});
      }

      res.status(200).json(meusIntermedios);

    }catch (error){
      res.status(500).json({ error: "Erro ao enviar produtos comprados." });
    }
})


app.get("/RankingTop6", async function(req, res){
  try{
      const topRanking = await rankingProdUnit.findAll({
          order: [
              ['quantidade', 'DESC'] // Ordena em ordem decrescente de quantidade
          ],
          limit: 6, // Obtém apenas os 10 primeiros registros
          include:{
            model:usuariodoador,
            attributes: ["nome","telefone"]
          }
      });
      
      res.status(200).json({ topRanking });
  } catch(error) {
      console.error("Erro ao obter o ranking top 10:", error);
      res.status(500).json({ error: "Erro ao obter o ranking top 10" });
  }
});


app.get("/MeuRanking",checkToken,verificarUsuarioDoador, async function(req,res){
    const id = req.userId;
    try{
         const minhaColocação = await rankingProdUnit.findOne({
          where: {
            usuariodoadorId: id,
          },
          include:{
            model: usuariodoador,
            attributes: ["nome"],
          }
         });

         if(!minhaColocação){
          return res.status(404).json ({message: "Não Possui Vendas!"});
         }
        
         const posicaoUsuario = await rankingProdUnit.count({
          where: {
              quantidade: {
                  [Op.gt]: minhaColocação.quantidade
              }
          }
      });

      const posicao = posicaoUsuario + 1;

      res.status(200).json({minhaColocação,posicao });

        }catch (error){
      res.status(500).json ({error: "Erro ao buscas Colocação"});
    }
});


// Função para gerar token de recuperação
async function generateRecoveryToken() {
  let token;
  let tokenExists = true;

  while (tokenExists) {
    token = crypto.randomBytes(20).toString('hex');
    const [doador, intermediario, beneficiario, empresa] = await Promise.all([
      usuariodoador.findOne({ where: { recoveryToken: token } }),
      usuariointermediario.findOne({ where: { recoveryToken: token } }),
      usuariobeneficiario.findOne({ where: { recoveryToken: token } }),
      usuarioEmpresa.findOne({ where: { recoveryToken: token } })
    ]);

    // Verifica se nenhum usuário possui o token gerado atualmente
    if (!doador && !intermediario && !beneficiario && !empresa) {
      tokenExists = false;
    }
  }

  console.log(token);
  return token;
}


async function sendRecoveryEmail(email, token) {
      // Se ocorrer um erro ao enviar pelo Gmail, enviar pelo Outlook
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
          auth: {
              user: 'DoaAlimentaSuporte@gmail.com',
              //pass: 'SenhaDoaAli123',
              pass: 'duud ceog apgb oiul',
          }
      });

      const outlookMailOptions = {
          from: 'DoaAlimentaSuporte@gmail.com',
          to: email,
          subject: 'Recuperação de Senha',
          text: `Olá! Você solicitou a recuperação de senha. Clique no link a seguir para redefinir sua senha: http://localhost:3000/AlterarSenha?token=${token}`
      };

      await transporter.sendMail(outlookMailOptions);

  }


// Rota para solicitar troca de senha
app.post('/solicitar-troca-senha', async function (req, res) {
  const { email } = req.body;

  // Verificar em qual tabela o e-mail está cadastrado
    const [doador, intermediario, beneficiario, empresa] = await Promise.all([
      usuariodoador.findOne({ where: { email: email } }),
      usuariointermediario.findOne({ where: { email: email } }),
      usuariobeneficiario.findOne({ where: { email: email } }),
      usuarioEmpresa.findOne({ where: { email: email } })
    ]);

    // Determinar em qual tabela o usuário está e obter o registro correspondente
    let user;
    if (doador) {
      user = doador;
    } else if (intermediario) {
      user = intermediario;
    } else if (beneficiario) {
      user = beneficiario;
    } else if (empresa){
      user = empresa;
    } 
    else {
      return res.status(404).json({ error: 'E-mail não Cadastrado' });
    }

  // Gerar e salvar token de recuperação
  let recoveryToken = await generateRecoveryToken();
  user.recoveryToken = recoveryToken;
  await user.save();

  // Enviar e-mail de recuperação
  await sendRecoveryEmail(email, recoveryToken);

  res.status(200).json({ message: 'E-mail de recuperação enviado com sucesso' });
});


// Rota para redefinir senha
app.post('/redefinir-senha', async function (req, res){
  const { token, novaSenha } = req.body;

// Verificar se o token de recuperação é válido  
const [doador, intermediario, beneficiario,empresa] = await Promise.all([
  usuariodoador.findOne({ where: { recoveryToken: token} }),
  usuariointermediario.findOne({ where: { recoveryToken: token } }),
  usuariobeneficiario.findOne({ where: { recoveryToken: token } }),
  usuarioEmpresa.findOne({ where: { recoveryToken: token } })
]);

    // Determinar em qual tabela o usuário está e obter o registro correspondente
    let user;
    if (doador) {
      user = doador;
    } else if (intermediario) {
      user = intermediario;
    } else if (beneficiario) {
      user = beneficiario;
    } else if (empresa){
      user = empresa;
    } else {
      return res.status(404).json({ error: 'E-mail não encontrado' });
    }


    try {
      // Gerar o hash da nova senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(novaSenha, salt);
  
      // Atualizar senha do usuário com o hash
      user.senha = passwordHash;
      //Muda os campos para undefined por não estar mais em processo de troca de senha
      user.recoveryToken = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao redefinir a senha' });
    }
  });
  
app.post("/ComprarProduto/:id", checkToken, verificarUsuarioIntermediario, async function (req, res) {
    const {nomeProd, quant, descricao, usuarioCompradorId, usuarioVendedorId,precoTotal} = req.body;
    const idProduto = req.params.id;

    try {
        const produto = await doacao.findByPk(idProduto, {
          include: {
            model: usuariodoador,
            attributes: ["idStripe"],
          }
        });
        if (!produto){
          return res.status(404).json ({ msg: "Produto não disponivel"});
        }

        const precoEmCentavos = precoTotal * 100;
        
        //Intermediario
        const usuarioComprador = await usuariointermediario.findByPk(usuarioCompradorId);
        const nomeComprador = await usuarioComprador.nome;
        const idStripeComprador = await usuarioComprador.idStripe;
        
        //Doador
        const idStripeVendedor = await produto.usuariodoador.idStripe;
  
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: nomeProd,
                            description: descricao,

                            // Adicione outros detalhes do produto, como preço, quantidade, etc.
                        },
                        unit_amount: precoEmCentavos , // Preço em centavos
                    },
                    quantity: quant, // Quantidade do produto
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/ListProdutorIntermed',
            cancel_url: 'http://localhost:3000/',
            payment_intent_data: {
              application_fee_amount: 200, // Taxa de aplicação em centavos (ex: R$ 2,00)
              transfer_data: {
                destination: idStripeVendedor, // ID da conta Stripe conectada do usuário
              },
              statement_descriptor: nomeComprador.substring(0, 22), // Max 22 chars
            },      
            metadata: {
              doacaoId: idProduto,
              usuarioId: usuarioCompradorId,
              usuarioIdStripe: idStripeComprador,
          }
        });
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        res.status(500).json({ error: 'Erro ao criar sessão de checkout' });
    }
});



app.get("/VerificarIntegracao/:userIdStripe", async function (req, res){
    const userIdStripe = req.params.userIdStripe;

    if (!userIdStripe) {
      return res.status(400).json({ msg: 'ID do Stripe não Encontrado.' });
    }

    try {
      const loginLink = await verificarIntegracao(userIdStripe);
  
      if (!loginLink) {
        res.status(200).json({ msg: 'Usuário já integrado' });
      } else {
        res.status(200).json({ loginLink });
      }
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao verificar integração', error: error.message });
    }
  });

async function verificarIntegracao(userIdStripe) {

    const account = await stripe.accounts.retrieve(userIdStripe);

    if (account.requirements.currently_due.length === 0) {
      return null;
    } else {
      // A conta ainda não está totalmente integrada, retorna linkDeIntegracao
      const loginLink = await stripe.accountLinks.create({
        account: userIdStripe,
        refresh_url: 'http://localhost:3000/',
        return_url: 'http://localhost:3000/',
        type: 'account_onboarding',
      });
      return loginLink;
    }
}

//Define o link de integracao para o menu da navbar
app.get("/ObterLinkDashboard/:userIdStripe", async function (req, res) {
  const userIdStripe = req.params.userIdStripe;

  try {
    const account = await stripe.accounts.retrieve(userIdStripe);

    if (account.requirements.currently_due.length === 0) {
      // A conta está totalmente integrada, retorna o loginLink
      const loginLink = await stripe.accounts.createLoginLink(userIdStripe);
      res.status(200).json({ loginLink });
    } else {
      // A conta ainda não está totalmente integrada, retorna linkDeIntegracao
      const loginLink = await stripe.accountLinks.create({
        account: userIdStripe,
        refresh_url: 'http://localhost:3000/',
        return_url: 'http://localhost:3000/',
        type: 'account_onboarding',
      });
      res.status(200).json({ loginLink });
    }

  } catch (error) {
    console.error('Erro ao buscar usuário Stripe:', error);
    res.status(500).json({ msg: "Erro ao buscar usuário Stripe" });
  }
});

app.get("/IntermediariosDisponiveis/:id", checkToken, verificarUsuarioEmpresa, async function(req,res){
    const id = req.params.id;

    try
    {
      const usuario = await usuarioEmpresa.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      const intermediariosDisponiveis = await usuariointermediario.findAll({
        where: {
          cidade: usuario.cidade
        },
        attributes: {
          exclude: ["recoveryToken", "senha"]
        }
      });      
    
    if(!intermediariosDisponiveis || intermediariosDisponiveis.length === 0)
    {
      return res.status(404).json ({msg: "Não há intermediarios Disponiveis ou Cadastrados"});
    }

    const intermediariosIntegradosPromises = intermediariosDisponiveis.map(async intermediario => {
      if (intermediario.idStripe) {
        const account = await stripe.accounts.retrieve(intermediario.idStripe);
        return account.details_submitted ? intermediario : null;
      }
      return null;
    });

    const intermediariosIntegradosResults = await Promise.all(intermediariosIntegradosPromises);
    const intermediariosIntegrados = intermediariosIntegradosResults.filter(intermediario => intermediario !== null);


    if (intermediariosIntegrados.length === 0) {
      return res.status(404).json({ msg: "Não há intermediários integrados ao Stripe disponíveis ou cadastrados" });
    }

    //Busca apenas os usuarios completamente integrados com o stripe
    res.status(200).json({intermediariosIntegrados });
    }catch(error){
    res.status(500).json({msg: "Erro ao buscar Intermediarios"});
    }
})

app.post("/RealizarDoacao/:idStripeIntermediario", checkToken, verificarUsuarioEmpresa, async function(req, res) {
  const idStripeIntermediario = req.params.idStripeIntermediario;
  const {userId, valor } = req.body;

  try {
      const usuarioPaga = await usuarioEmpresa.findByPk(userId);
      const nomePaga = await usuarioPaga.nome;
      const usuarioEmpresaStripe = await usuarioPaga.idStripe;
      const usuarioRecebedor = await usuariointermediario.findOne( { where: {idStripe: idStripeIntermediario}});
      const nomeRecebedor = await usuarioRecebedor.nome;
      const usuarioPagadorIdCliente = usuarioPaga.idCliente;
      const idIntermediario = usuarioRecebedor.id;
      const session = await stripe.checkout.sessions.create({
        customer: usuarioPagadorIdCliente, // Associar o PaymentIntent ao cliente 
        line_items: [
            {
                price_data: {
                    currency: 'brl',
                    product_data: {
                      name: "Doação",
                        description: "Doação em dinheiro para " + nomeRecebedor,

                        // Adicione outros detalhes do produto, como preço, quantidade, etc.
                    },
                    unit_amount: valor * 100 , // Preço em centavos
                },
                quantity: 1, // Quantidade do produto
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/ContribFinanceiraEmpresa',
        cancel_url: 'http://localhost:3000/',
        payment_intent_data: {
          application_fee_amount: 200, // Taxa de aplicação em centavos (ex: R$ 2,00)
          transfer_data: {
            destination: idStripeIntermediario, // ID da conta Stripe conectada do usuário
          },
          statement_descriptor: nomePaga.substring(0, 22) // Max 22 chars
        },      
        metadata: {
          usuarioId: userId,
          doacaoMonetaria: "Sim",
          NomeusuarioRecebedor: nomeRecebedor,
          usuarioPagadorStripe: usuarioEmpresaStripe,
          idIntermediario: idIntermediario,
          valorTotal: valor*100,
          description: "Doação em dinheiro para " + nomeRecebedor,
      }
    });


      res.json({ sessionId: session.id }); // Retornar o link de pagamento para o cliente
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      res.status(500).json({ error: 'Erro ao criar sessão de checkout' });
  }
});


const handleDonation = async (session) => {
  try {
    const valor = session.metadata.valorTotal;
    const descricao = session.metadata.description;
    const intermediarioId = session.metadata.idIntermediario;
    const usuarioId = session.metadata.usuarioId;

      const pagamento = await Transacao.create({
        usuariointermediarioId: intermediarioId,
        usuarioEmpresaId: usuarioId,
        descricao: descricao,
        Valor: valor,
        paymentIntentId: session.payment_intent,
      })
      
      // Retornar os IDs do PaymentIntent
      return { pagamento};

    
  } catch (error) {
      // Lidar com erros
      console.error("Erro ao criar objeto de pagamento:", error);
      throw error;
  }
};


const handleProductSale = async (id,usuarioId) => {
  try {
    const result = await coletarDoacao(id, usuarioId);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};


async function coletarDoacao(id, usuarioId) {

  try {
      // Encontrar a doação na tabela doacaos com base no ID fornecido
      const doacao1 = await doacao.findByPk(id);

      if (!doacao1) {
          return res.status(404).json({ error: "Doação não encontrada" });
      }

      const dataAtual = new Date();

      const doacaoColetadaValues = {
        nome_alimento: doacao1.nome_alimento,
        quantidade: doacao1.quantidade,
        foto: doacao1.foto,
        rua: doacao1.rua,
        numero: doacao1.numero,
        cidade: doacao1.cidade,
        validade: doacao1.validade,
        descricao: doacao1.descricao,
        categoria: doacao1.categoria,
        dataColeta: dataAtual,
        usuariodoadorId: doacao1.usuariodoadorId,
        usuariointermediarioId:usuarioId,
        formato: doacao1.formato,
        preco: doacao1.preco,
    };

      await doacaoColetada.create(doacaoColetadaValues);
      await produtoCompradoOriginal.create(doacaoColetadaValues);

      let RankingDoador = await rankingProdUnit.findOne({
        where: {
            usuariodoadorId: doacao1.usuariodoadorId
        }
    });
      

      if(!RankingDoador){
        RankingDoador = await rankingProdUnit.create({
          usuariodoadorId: doacao1.usuariodoadorId,
          quantidade: 1, //Inicia com 1 pois é a primeira venda
        });
      }else{
        RankingDoador.quantidade += 1; 
      }
      await RankingDoador.save();

      // Remover a doação encontrada da tabela doacaos
      await doacao1.destroy();

      // Responder ao cliente com sucesso
      return { message: "Doação coletada com sucesso" };
    } catch (error) {
      return { error: "Erro ao coletar produto" };
  }
};

app.get("/HistoricoContribuicao/:id", checkToken, verificarUsuarioEmpresa, async function(req,res){
    const idEmpresa = req.params.id;

    try{

      const minhasTransacoes = await Transacao.findAll({
        where: {
          usuarioEmpresaId: idEmpresa 
        },
        include: {
          model:usuariointermediario,
          attributes: ['nome', 'telefone', 'cnpj'],
        }
      });

      if(!minhasTransacoes || minhasTransacoes.length === 0){
        return res.status(404).json ({ msg: "Não há transacoes!"});
      }

      res.status(200).json ({minhasTransacoes});
    }catch (error){
      res.status(500).json({ error: 'Erro ao obter transacoes' });
    }

})

app.get("/DoacoesRecebidas/:id", checkToken, verificarUsuarioBeneficiario, async function(req, res) {
  const usuarioBenefId = req.params.id;

  try {
    const doacoes = await DistribuirProduto.findAll({ where: { usuariobeneficiarioId: usuarioBenefId },
    include:{
      model: produtoCompradoOriginal,
      attributes:
        ["nome_alimento","quantidade","rua","numero","cidade", "foto", "categoria"]
    } });

    const doacoesComImagens = await Promise.all(doacoes.map(async (doacao) => {
      // Redimensionar a imagem para 100x100 pixels mantendo a proporção
      const imagemRedimensionada = await sharp(doacao.produtoComprado.foto).resize({ width: 1000, height: 1000, fit: 'inside' }).toBuffer();
      const imagemBase64 = imagemRedimensionada.toString('base64');
      
      return { ...doacao.toJSON(), imagemBase64 }; // Incluir a imagem convertida na representação JSON da doação
    }));

    res.status(200).json({ doacoes: doacoesComImagens });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar doações por usuário", message: error.message });
  }
});



