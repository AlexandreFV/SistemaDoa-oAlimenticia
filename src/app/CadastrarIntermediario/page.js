"use client"
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import ErroCadastro from '../components/erroCadastro';
import CustomButton from '../components/customButton';
import "./style.css";
import { BackButton } from "../components/BackButton";

export default function CadastroIntermediario() {

  // Estado para controlar qual botão está ativo
  const [activeButton, setActiveButton] = useState(1);
  const [classificacao, setClassificacao] = useState([]);

  const validateForm1 = () => {
    if (nome === "" || email === "" || cnpj === "" || senha === "" || rua === "" || cidade === "" || numero === "" || telefone === "" || dataNasc === "") {
      setErroCadastro("Preencha todos os campos!");
      return false;
    }
    setErroCadastro("");
    return true;
  };


  // Função para lidar com o clique do botão
  const handleButtonClick = (button) => {
    // Se o botão clicado for o mesmo que já está ativo, retorna sem fazer nada
    if (button === activeButton) {
      return;
    }

    if (button === 2 && !validateForm1()) {
      return;
    }

    // Define o botão clicado como ativo
    setActiveButton(button);
  };

  // Efeito para definir o form1 como ativo ao carregar a página
  useEffect(() => {
    setActiveButton(1); // Define o botão form1 como ativo
  }, []);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [cadastroConcluido, setCadastroConcluido] = useState(false); // Estado para indicar se o cadastro foi concluído
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const router = useRouter();
  const [erroCadastro, setErroCadastro] = useState(""); // Estado para armazenar a mensagem de erro
  const [telefone, setTelefone] = useState("");
  const [NumerAgen, setNumerAgen] = useState("");
  const [NumerConta, setNumeroConta] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [selectedBank, setSelectedBank] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar se o formulário está sendo enviado

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Define isLoading como true durante o envio do formulário

    if (nome != "" && email != "" && cnpj != "" && senha != "" && rua != "" && cidade != "" && numero != "" && telefone != ""
      && NumerAgen != "" && NumerConta != "" && dataNasc != "" && selectedBank != "invalido"
    ) {

      try {
        const response = await fetch("http://localhost:3001/CadastrarIntermediario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            cnpj,
            senha,
            cidade,
            rua,
            numero,
            telefone,
            NumerAgen,
            NumerConta,
            dataNasc,
            selectedBank,
          }),
        });

        if (response.ok) {
          console.log("Cadastro realizado com sucesso!");
          // Redirecionar ou exibir uma mensagem de sucesso aqui
          setCadastroConcluido(true); // Atualiza o estado para indicar que o cadastro foi concluído
          router.push('/EntrarIntermediario');

        } else {
          const responseData = await response.json();
          if (responseData.msg === 'E-mail já está em uso por outro usuário!') {
            setErroCadastro("E-mail já está em uso!");
            setIsLoading(false);
          } if (responseData.msg === 'Número de telefone inválido.') {
            setErroCadastro("Número de telefone inválido");
            setIsLoading(false);
          }

          console.error("Erro ao cadastrar doador:", response.statusText);
          setIsLoading(false);
          // Exibir uma mensagem de erro aqui
        }
      } catch (error) {
        console.error("Erro ao realizar requisição:", error.message);
        setIsLoading(false);
        // Exibir uma mensagem de erro aqui
      } finally {
        setIsLoading(false); // Define isLoading como false após o envio do formulário
      }
    } else {
      setErroCadastro("Preencha todos os campos!");
      setIsLoading(false);
    }
  };


  return (

    <div className='DPCI' >
      <div className="BCCI">

        <Navbar />
        <BackButton />


        <div className='DNCI' >
          <div className='DBNCI'>

            <div className='DICCI'>
              <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Já possui conta?</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Entre e continue sua jornada de </p>
              <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>transmissão de esperança..</p>
              <CustomButton href="/EntrarIntermediario" className="button btn" buttonText="Entrar" />
              {erroCadastro && <ErroCadastro erro={erroCadastro} />}

            </div>

            <div className="DFBCI">
              <center>
                <h1 className='h1CadastrarCI'>Cadastro Intermediario</h1>
              </center>

              <form onSubmit={handleSubmit} className="formCadIntermed1" style={{ display: activeButton === 1 ? 'block' : 'none' }}>
                <p style={{ fontWeight: "bold", fontSize: "1.2rem", marginTop: "1rem", textAlign: "center" }}>Dados Pessoais</p>
                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                  <label for="exampleInputEmail1">Nome Completo</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" name="nome"
                    aria-describedby="emailHelp" placeholder="Digite seu nome completo..."
                    style={{ backgroundColor: "transparent" }}
                    value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">Email</label>
                  <input type="Email" class="form-control" id="exampleInputEmail1" name="email"
                    aria-describedby="emailHelp" placeholder="Digite seu e-mail..."
                    style={{ backgroundColor: "transparent" }}
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">CNPJ</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX" name="cnpj"
                    style={{ backgroundColor: "transparent" }}
                    value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">Data de Fundação</label>
                  <input type="date" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Digite sua Data de Nascimento..."
                    style={{ backgroundColor: "transparent", color: "#a2ba8c" }} name="dataNasc"
                    value={dataNasc} onChange={(e) => setDataNasc(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <div className="row">

                    <div className="col-sm-6">

                      <label for="exampleInputEmail1">Telefone</label>
                      <input type="text" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Digite seu Telefone..."
                        style={{ backgroundColor: "transparent" }} name="telefone"
                        value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    </div>

                    <div className="col-sm-6">

                      <label for="exampleInputEmail1">Cidade</label>
                      <input type="text" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Digite sua cidade..."
                        style={{ backgroundColor: "transparent" }} name="cidade"
                        value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    </div>

                  </div>
                </div>




                <div className="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label for="exampleInputEmail1">Rua</label>
                      <input type="text" className="form-control rua" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Digite sua rua..."
                        style={{ backgroundColor: "transparent" }} name="rua"
                        value={rua} onChange={(e) => setRua(e.target.value)} />
                    </div>

                    <div className="col-sm-6">
                      <label for="exampleInputEmail1">Número</label>
                      <input type="number" className="form-control numero" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Digite o numero..."
                        style={{ backgroundColor: "transparent" }} name="numero"
                        value={numero} onChange={(e) => setNumero(e.target.value)} />
                    </div>
                  </div>
                </div>


                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">Senha</label>
                  <input type="password" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Digite sua senha..." name="senha"
                    style={{ backgroundColor: "transparent" }}
                    value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>

                <center>
                  <button className={activeButton === 2 ? 'active button' : 'button'}
                    onClick={() => {
                      handleButtonClick(2);
                    }} type="submit"
                  >Próximo</button>
                </center>

              </form>



              <div>
                <form onSubmit={handleSubmit} className="formCadIntermed2" style={{ display: activeButton === 2 ? 'block' : 'none' }}>
                  <p style={{ fontWeight: "bold", fontSize: "1.2rem", marginTop: "1rem", textAlign: "center" }}>Dados Bancários</p>
                  <div className="DFBCD1">


                    <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                      <label for="exampleInputEmail1">Numero da Conta</label>
                      <input type="text" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Digite seu numero da conta do Banco..."
                        style={{ backgroundColor: "transparent" }} name="NumerConta"
                        value={NumerConta} onChange={(e) => setNumeroConta(e.target.value)} />
                    </div>

                    <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                      <label for="exampleInputEmail1">Numero da Agencia</label>
                      <input type="text" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Digite o numero de sua Agencia..."
                        style={{ backgroundColor: "transparent" }} name="NumerAgen"
                        value={NumerAgen} onChange={(e) => setNumerAgen(e.target.value)} />
                    </div>

                    <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                      <label for="exampleInputEmail1">Nome do banco</label>
                      <select
                        className="form-control"
                        id="selectBanco"
                        style={{ backgroundColor: "transparent" }}
                        name="NomeBanc"
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                      >
                        <option value="invalido">Selecione um Banco...</option>
                        <option value="001">Banco do Brasil</option>
                        <option value="104">Caixa Econômica Federal</option>
                        <option value="341">Itaú</option>
                        <option value="237">Bradesco</option>
                        <option value="033">Santander</option>

                      </select>

                    </div>
                  </div>

                  <center>
                    <button className="button" type="submit"
                      disabled={isLoading}> {isLoading ? 'Cadastrando...' : 'Cadastrar'}</button>
                  </center>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}