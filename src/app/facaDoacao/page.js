"use client"
import "./style.css";
import Navbar from "../components/layoutCadastroLogin";
import Menu from "../components/menuDoador";
import "./style.css";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BackButton, CustomButton } from "../components/customButton";
import Link from "next/link";
import SucErroAddDoacao from "../components/SucErroAddDoacao";
import jwt from 'jsonwebtoken';

export default function FacaDoacao() {
  const [nome_alimento, setNome] = useState("");
  const [quantidade, setQuant] = useState("");
  const [categoria, setCategoria] = useState("");
  const [foto, setFoto] = useState(null); // Alteração aqui: estado para armazenar o arquivo
  const [rua, setRua] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [validade, setValidade] = useState("");
  const [userData, setUserData] = useState(null); // Armazena as informações do usuário
  const [erroCadastro, setErroCadastro] = useState(""); // Estado para armazenar a mensagem de erro
  const [succesCadastro, setSuccesCadastro] = useState(""); // Estado para armazenar a mensagem de erro
  const [fileError, setFileError] = useState(""); // Estado para armazenar a mensagem de erro do campo de arquivo
  const [preco, setPreco] = useState("");
  const router = useRouter();
  const [formato, setFormato] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica se há um token no armazenamento local

    if (!token) {
      // Se não houver token, redireciona para a página de login
      router.push('/Cadastrar');
    } else {
      // Se houver token, envie uma solicitação para o servidor para obter os detalhes do usuário
      const UserType = localStorage.getItem('userType');
      if (UserType !== 'doador') {
        router.push("/PermissaoNegada");
      } else {
        // Busca as informações do usuário quando a página é carregada
        fetchUserData();
      }
    }
  }, []);

  // Função para buscar as informações do usuário
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/ObterDadosEndereco', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Preenche os estados com as informações do usuário
        setRua(userData.rua);
        setCidade(userData.cidade);
        setNumero(userData.numero);
      } else {
        console.error('Erro ao obter dados do usuário:', response.statusText);
        // Exibir uma mensagem de erro aqui, se necessário
      }
    } catch (error) {
      console.error('Erro ao realizar requisição:', error.message);
      // Exibir uma mensagem de erro aqui, se necessário
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userIdStripe = localStorage.getItem("IdStripe");
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const usuariodoadorId = decodedToken.id;

    if (nome_alimento !== "" && quantidade !== "" && foto !== null && rua !== "" && numero !== "" && cidade !== "" && preco != "" && formato != "") {

      try {

        const formData = new FormData();
        formData.append("nome_alimento", nome_alimento);
        formData.append("quantidade", quantidade);
        formData.append("foto", foto);
        formData.append("rua", rua);
        formData.append("numero", numero);
        formData.append("cidade", cidade);
        formData.append("validade", validade);
        formData.append("descricao", descricao);
        formData.append("categoria", categoria);
        formData.append("preco", preco);
        formData.append("formato", formato);

        const response = await fetch(`http://localhost:3001/EnviarDoacao/${usuariodoadorId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação no cabeçalho da requisição
          },
          body: formData,
        });

        if (response.ok) {
          console.log("Cadastro realizado com sucesso!");
          router.push("/MinhasDoacoes");

          // Limpa os estados de erro e sucesso após 3 segundos
          setTimeout(() => {
            setErroCadastro("");            
          }, 3000);
        } else {
          const responseData = await response.json();

          console.error("Erro ao enviar doacao:", response.statusText);
          // Exibir uma mensagem de erro aqui
        }
      } catch (error) {
        console.error("Erro ao realizar requisição:", error.message);
        // Exibir uma mensagem de erro aqui
      }
    } else {

      setErroCadastro("Preencha todos os campos!");
      // Limpa os estados de erro e sucesso após 3 segundos
      setTimeout(() => {
        setErroCadastro("");
      }, 3000);
    }
  };

  // Função para lidar com a alteração do campo de arquivo
  const handleFileChange = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const fileType = file.type;
  
      // Verifica se o tipo de arquivo é uma imagem
      if (fileType.startsWith("image/")) {
        const fileSize = file.size;
        const fileMb = fileSize / (1024 ** 2);
  
        if (fileMb <= 16) {
          setFoto(file);
        } else {
          event.target.value = null;
          alert("O arquivo selecionado é muito grande. Selecione um arquivo menor.");
          setFileError("O arquivo selecionado é muito grande. Selecione um arquivo menor.");
        }
      } else {
        event.target.value = null;
        alert("O arquivo selecionado não é uma imagem. Por favor, selecione um arquivo de imagem.");
        setFileError("O arquivo selecionado não é uma imagem. Por favor, selecione um arquivo de imagem.");

      }
    }
  };
  


  // Função para limpar o estado do erro quando o formulário é submetido novamente
  const handleFormSubmit = (event) => {
    handleSubmit(event);
    setErroCadastro(""); // Limpa o estado do erro
  };


  useEffect(() => {
    // Verifica se o usuário é do tipo doador
    const userType = localStorage.getItem('userType'); // Supondo que userType esteja armazenado no localStorage

    if (userType !== 'doador') {
      // Se não for doador, redireciona para a página de permissão negada
      router.push('/PermissaoNegada');
    }
  }, []);

  return (

    <div className="DPFACADOA">
      <Navbar />
      <div className="DFFACADOA">
        <Menu />

        <div className="DIFACADOA">
          <div className="DFPFACADOA">

            <BackButton />

            <h1 className="tituloFACADOA">Faça sua doação</h1>
            <div className="DFFFACADOA">

              <center>
                <h1 style={{ paddingTop: "20px" }}>Dados da Doação</h1>
              </center>
              <div class="modal-content custom-modal-line" style={{height:"3px"}}> </div>

              <form onSubmit={handleSubmit}>

                <div className="coluna1FACADOA">
                  <label>
                    Nome do Produto:
                  </label>
                  <label className="precoLabelFACADOA">
                    Preço Total:
                  </label>
                  
                  <div class="form-groupFACADOA">
                  <input type="text" name="nome_alimento" class="form-control"
                    placeholder="Produto..." value={nome_alimento}
                    onChange={(e) => setNome(e.target.value)} style={{width:"40%"}} />
                    <input type="number" name="preco" class="form-control"
                    placeholder="Preço..." value={preco}
                    onChange={(e) => setPreco(e.target.value)} style={{width:"50%"}} />
                  </div>

    
  
                  <label className="quantLabelFACADOA">
                    Quantidade:
                  </label>
                  <label className="formatoLabelFACADOA">
                    Formato:
                  </label>

                  <div class="form-groupFACADOA">
                    <input type="number" name="quantidade" class="form-control quantFACADOA"
                      placeholder="quant." value={quantidade}
                      onChange={(e) => setQuant(e.target.value)} min={1} pattern="[0-9]*"  />
                    <select name="formato" className="form-control formatoFACADOA" value={formato} onChange={(e) => setFormato(e.target.value)}>
                      <option value="">Selecione...</option>
                      <option value="Kilograma">Kilograma</option>
                      <option value="Gramas">Gramas</option>
                      <option value="Unidades">Unidades</option>

                    </select>
                  </div>

                  <label className="validadeLabelFACADOA">
                    Validade do produto:
                  </label>
                  <input type="date" name="validade" class="form-control"
                    placeholder="selecione a data..." value={validade}
                    onChange={(e) => setValidade(e.target.value)} />


                  <label className="cidadeLabelFACADOA">
                    Cidade:
                  </label>
                  <input type="text" name="cidade" class="form-control" value={cidade}
                    onChange={(e) => setCidade(e.target.value)} disabled/>
                </div>


                <div className="coluna2FACADOA">
                  <label>
                    Foto do Produto:
                  </label>
                  
                  <input type="file" name="foto" class="form-control"
                    onChange={handleFileChange}   accept="image/*" 
                    />

                  <label className="descricaoLabelFACADOA">
                    Descrição:
                  </label>
                  <input name="descricao" placeholder="Digite mais detalhes..." class="form-control descr" value={descricao}
                    onChange={(e) => setDescricao(e.target.value)} />


<div style={{ display: "flex", alignItems: "center" }}>
  <div style={{ marginRight: "10px" }}>
    <label className="ruaLabelFACADOA">Rua:</label>
    <input 
      type="text" 
      name="rua" 
      class="form-control" 
      value={rua} 
      onChange={(e) => setRua(e.target.value)} 
      style={{ width: "100%" }} 
    />
  </div>

  <div style={{ paddingLeft: "30px",paddingTop:"20px" }}>
    <label className="numeroLabel">Numero:</label>
    <input 
      type="text" 
      name="numero" 
      class="form-control" 
      value={numero} 
      onChange={(e) => setNumero(e.target.value)} 
      style={{ width: "100%" }} 
    />
  </div>
</div>

                  <label className="categoriaLabelFACADOA">Categoria:</label>
                    <select name="categoria" className="form-control categoFACADOA" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                      <option value="">Selecione a categoria</option>
                      <option value="fruta">Fruta</option>
                      <option value="tuberculo">Tubérculo</option>
                      <option value="hortalicia">Hortaliça</option>
                      <option value="marmita">Marmita</option>
                      <option value="Carnes e Aves">Carnes e Aves</option>
                      <option value="Peixes e Frutos do Mar">Peixes e Frutos do Mar</option>
                      <option value="Produtos de Padaria">Produtos de Padaria</option>

                    </select>
                </div>

                <button className="btnEnviFACADOA" type='submit'>Enviar</button>

              </form>


            </div>

          </div>

        </div>

      </div>
      {erroCadastro && <SucErroAddDoacao ErroAddDoa={erroCadastro} />}

      {succesCadastro && <SucErroAddDoacao SuccessAddDoa={succesCadastro} />}
    </div>
  );
};



