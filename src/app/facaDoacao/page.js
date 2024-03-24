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

  const router = useRouter();


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

    if (nome_alimento !== "" && quantidade !== "" && foto !== null && rua !== "" && numero !== "" && cidade !== "") {

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


        const response = await fetch("http://localhost:3001/EnviarDoacao", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação no cabeçalho da requisição
          },
          body: formData,
        });

        if (response.ok) {
          console.log("Cadastro realizado com sucesso!");

          setSuccesCadastro("Adicionado Com sucesso!");
          // Limpa os estados de erro e sucesso após 3 segundos
          setTimeout(() => {
            setErroCadastro("");
            setSuccesCadastro("");
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
        setSuccesCadastro("");
      }, 3000);
    }
  };

  // Função para lidar com a alteração do campo de arquivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFoto(file);
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
    <div className="DivPai">
      <Navbar />
      <div className="DivFilho">
        <Menu />

        <div className="DivImagem">
          <div className="DivFundoPai">

            <BackButton />

            <h1 className="titulo">Faça sua doação</h1>
            <div className="DivFundoFilho">

              <center>
                <h1 style={{ paddingTop: "20px" }}>Dados da Doação</h1>
              </center>
              <div class="modal-content custom-modal-line"> </div>

              <form onSubmit={handleSubmit}>

                <div className="coluna1">
                  <label>
                    Nome do Produto:
                  </label>
                  <input type="text" name="nome_alimento" class="form-control"
                    placeholder="Digite o nome do produto..." value={nome_alimento}
                    onChange={(e) => setNome(e.target.value)} />

                  <label className="quantLabel">
                    Quantidade:
                  </label>
                  <label className="categoriaLabel">
                    Categoria:
                  </label>

                  <div class="form-group">
                    <input type="text" name="quantidade" class="form-control quant"
                      placeholder="quant." value={quantidade}
                      onChange={(e) => setQuant(e.target.value)} />
                    <select name="categoria" className="form-control catego" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
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

                  <label className="validadeLabel">
                    Validade do produto:
                  </label>
                  <input type="date" name="validade" class="form-control"
                    placeholder="selecione a data..." value={validade}
                    onChange={(e) => setValidade(e.target.value)} />


                  <label className="cidadeLabel">
                    Cidade:
                  </label>
                  <input type="text" name="cidade" class="form-control" value={cidade}
                    onChange={(e) => setCidade(e.target.value)} />

                </div>


                <div className="coluna2">
                  <label>
                    Foto do Produto:
                  </label>
                  <input type="file" name="foto" class="form-control"
                    onChange={handleFileChange} />

                  <label className="descricaoLabel">
                    Descrição:
                  </label>
                  <input name="descricao" placeholder="Digite mais detalhes..." class="form-control descr" value={descricao}
                    onChange={(e) => setDescricao(e.target.value)} />


                  <label className="ruaLabel">
                    Rua:
                  </label>
                  <input type="text" name="rua" class="form-control" value={rua}
                    onChange={(e) => setRua(e.target.value)} />


                  <label className="numeroLabel">
                    Numero:
                  </label>
                  <input type="text" name="numero" class="form-control" value={numero}
                    onChange={(e) => setNumero(e.target.value)} />

                </div>

                <button className="btnEnvi" type='submit'>Enviar</button>

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



