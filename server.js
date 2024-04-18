require('dotenv').config();

const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const { Sequelize } = require('sequelize');
// Use o middleware cors
app.use(cors());

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

const usuariobeneficiario = require("./models/usuarioBeneficiario");
const usuariodoador = require("./models/usuariodoador");
const usuariointermediario = require("./models/usuarioIntermediario");
const doacaoColetada = require("./models/DoacaoColetada");
const DoacaoIntermParaBenef = require("./models/DoacaoIntermParaBenef");
const doacao = require("./models/doacao");
const usuarioEmpresa = require("./models/usuarioEmpresa");

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


// Aplique o Middleware às Rotas Protegidas
app.get('/MinhasDoacoes',checkToken, verificarUsuarioDoador, function(req, res) {
  // Se o middleware passou, significa que o usuário está autenticado e autorizado para acessar esta rota
  res.status(200).json({ mensagem: 'Você está autorizado a acessar esta rota.' });
});


app.post("/CadastrarBeneficiario", async function(req, res){
    const { nome, email, cpf, senha, rua, cidade, numero,telefone  } = req.body;

    if (!nome || !email || !cpf || !senha || !rua || !cidade || !numero || !telefone) {
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
  const { nome, email, cpf, senha,rua,cidade,numero,telefone } = req.body;

  if (!nome || !email || !cpf || !senha || !rua || !cidade || !numero || !telefone) {
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
   const newUser = await usuariodoador.create({
    nome,
    email,
    senha: passwordHash, // Use o hash da senha
    cpf,
    rua,
    numero,
    cidade,
    telefone
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){

    res.status(500).json({msg: error})
    res.status(500).json({ msg: "Erro ao cadastrar beneficiário", error: error.message });

  }

});


app.post("/CadastrarIntermediario", async function(req, res){
  const { nome, email, cnpj, senha, rua, cidade, numero, telefone } = req.body;

  if (!nome || !email || !cnpj || !senha || !rua || !cidade || !numero || !telefone) {
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
   const newUser = await usuariointermediario.create({
    nome,
    email,
    senha: passwordHash, // Use o hash da senha
    cnpj,
    rua,
    numero,
    cidade,
    telefone
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){

    res.status(500).json({msg: error})
    res.status(500).json({ msg: "Erro ao cadastrar Intermediario", error: error.message });

  }

});

app.post("/CadastrarEmpresa", async function(req, res){
  const { nome, email, cnpj, senha, rua, cidade, numero, telefone } = req.body;

  if (!nome || !email || !cnpj || !senha || !rua || !cidade || !numero || !telefone) {
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
  }

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
    telefone
});

res.status(201).json({ msg: "Usuário criado com sucesso!", user: newUser });


  } catch (error){
    res.status(500).json({ msg: "Erro ao cadastrar Empresa", error: error.message });
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


app.post("/EnviarDoacao", upload.single('foto'), checkToken, verificarUsuarioDoador, async function(req, res) {
  const { nome_alimento, quantidade, rua, numero, cidade, validade, descricao,categoria } = req.body;
  const foto = req.file.buffer; // Obtenha os dados binários da imagem

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const usuariodoadorId = decodedToken.id;

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
      console.error("Erro ao obter dados do endereço:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
  }
});


app.get("/ColetarDoacao", checkToken,verificarUsuarioIntermediario, async function(req,res){

  try{

    const doacoes = await doacao.findAll({
      include: {
        model: usuariodoador, // Substitua 'Doador' pelo nome do seu modelo de doador
        attributes: ['nome','telefone'] // Inclua apenas o nome do doador
      }
    });
    
      // Converter imagens em formato base64
      const doacoesComImagens = await Promise.all(doacoes.map(async (doacao) => {
        const imagemBase64 = Buffer.from(doacao.foto, 'binary').toString('base64');
        return { ...doacao.toJSON(), imagemBase64 }; // Incluir a imagem convertida na representação JSON da doação
      }));

    res.status(200).json(doacoesComImagens); // Retorna as doações como resposta
  }catch (error) {
    console.error("Erro ao buscar doações:", error);
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
        attributes: ['nome','telefone'] // Inclua apenas o nome do doador
      }
    });


    res.status(200).json(doacoes);
  } catch (error) {
    console.error("Erro ao buscar doação:", error);
    res.status(500).json({ error: "Erro ao buscar doação" });
  }
});


app.post("/ComprarProduto/:id",checkToken,verificarUsuarioIntermediario, async function (req, res) {
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
    };

      await doacaoColetada.create(doacaoColetadaValues);

        // Remover a doação encontrada da tabela doacaos
        await doacao1.destroy();

      // Responder ao cliente com sucesso
      res.status(200).json({ message: "Doação coletada com sucesso" });
  } catch (error) {
      console.error("Erro ao coletar produto:", error);
      res.status(500).json({ error: "Erro ao coletar produto" });
  }
});

app.get("/MeusIntermedios", checkToken, verificarUsuarioIntermediario, async function (req,res){
  res.status(200).json({ mensagem: 'Você está autorizado a acessar esta rota.' });

})


app.get("/ListProdutorIntermed", checkToken, verificarUsuarioIntermediario, async function (req, res){
  const usuarioId = req.userId;
  try {

    const meusIntermedios = await doacaoColetada.findAll({ 
      where: { usuariointermediarioId: usuarioId },
      include: { // Incluir informações do doador
        model: usuariodoador, // Nome do modelo do doador
        attributes: ['nome', 'cpf','telefone'] // Atributos a serem incluídos
      }
    });    
    if (!meusIntermedios || meusIntermedios.length === 0) {
      return res.status(404).json({ error: "Nenhuma doação intermediária encontrada" });
    }

   

    res.status(200).json({ meusIntermedios });
  } catch (error) {
    console.error("Erro ao buscar doações intermediárias:", error);
    res.status(500).json({ message: "Erro ao processar a solicitação" });
  }
});

app.get("/ListarBeneficiario", checkToken, verificarUsuarioIntermediario, async function(req, res) {
  const usuariointermediarioId = req.userId;
  try {
      const contagemDoacoesPorBeneficiario = await DoacaoIntermParaBenef.findAll({
          attributes: [
              'usuariobeneficiarioId', 
              [sequelize.fn('COUNT', sequelize.col('*')), 'count']
          ],
          include: [{
              model: usuariobeneficiario,
              attributes: ["nome", "id", "rua", "numero", "cidade", "cpf", "telefone", "createdAt","updatedAt"]
          }],
          where: { usuariointermediarioId: usuariointermediarioId},
          group: ['usuariobeneficiarioId']
      });

      if (contagemDoacoesPorBeneficiario.length === 0) {
          return res.status(404).json({ message: "Nenhuma doação encontrada!" });
      }

      res.status(200).json({ contagemDoacoesPorBeneficiario });
  } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
  }
});



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
    console.error("Erro ao buscar doação:", error);
    res.status(500).json({ error: "Erro ao buscar doação" });
  }
});

app.delete("/ApagarDoacao/:id",checkToken, verificarUsuarioDoador, async function (req,res){
    const id = req.params.id;

    try{

      const doacaoApagar = await doacao.findByPk(id);
      if(!doacaoApagar){
        res.status(404).json({error:"Doacao Não encontrada!"});
      }
      doacaoApagar.destroy();

      res.status(200).json ({message:"Doação Apagada!"});
    
    } catch (error){
      res.status(500).json ({error:"Erro ao Buscar Doação"});
    }
})