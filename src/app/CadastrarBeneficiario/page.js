"use client"
import { useRouter } from 'next/navigation';
import Link from "next/link"
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import ErroCadastro from '../components/erroCadastro';
import "./style.css";
import CustomButton from '../components/customButton';
import { BackButton } from "../components/BackButton";

export default function CadastrarBeneficiario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cadastroConcluido, setCadastroConcluido] = useState(false); // Estado para indicar se o cadastro foi concluído
  const router = useRouter();
  const [erroCadastro, setErroCadastro] = useState(""); // Estado para armazenar a mensagem de erro

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nome != "" && email != "" && cpf != "" && senha != "" && rua != "" && cidade != "" && numero != "" && telefone != "") {

      try {
        const response = await fetch("http://localhost:3001/cadastrarBeneficiario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            cpf,
            senha,
            cidade,
            rua,
            numero,
            telefone
          }),
        });

        if (response.ok) {
          console.log("Cadastro realizado com sucesso!");
          // Redirecionar ou exibir uma mensagem de sucesso aqui
          setCadastroConcluido(true); // Atualiza o estado para indicar que o cadastro foi concluído
          // Redireciona o usuário para a tela de login
          router.push('/EntrarBeneficiario');
        } else {

          const responseData = await response.json();
          if (responseData.msg === 'E-mail já está em uso por outro usuário!') {
            setErroCadastro("E-mail já está em uso!");
          }
          console.error("Erro ao cadastrar beneficiário:", response.statusText);
          // Exibir uma mensagem de erro aqui
        }
      } catch (error) {
        console.error("Erro ao realizar requisição:", error.message);
        // Exibir uma mensagem de erro aqui
      }
    } else {
      setErroCadastro("Preencha todos os campos!");
    }
  };


  return (


    <div className='DVCB' >
      <div className="BCCB">


        <Navbar />
        <BackButton />

        <div className='DNCB' >
          <div className='DBNCB'>

            <div className='DivInfCadast'>
              <h1 className='h1EntreSejaCB' >Já possui conta?</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>Entre e seja beneficiado.</p>
              <CustomButton href="/EntrarBeneficiario" className="button btn" buttonText="Entrar" />
              {erroCadastro && <ErroCadastro erro={erroCadastro} />}

            </div>

            <div className="DFBCB">
              <center>
                <h1 className='h1CadastrarCB'>Cadastro Beneficiário</h1>
              </center>

              <form onSubmit={handleSubmit}>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                  <label for="exampleInputEmail1">Nome Completo</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Digite seu nome completo..."
                    style={{ backgroundColor: "transparent" }} name="nome"
                    value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">Email</label>
                  <input type="Email" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Digite seu e-mail..."
                    style={{ backgroundColor: "transparent" }} name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">CPF</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX"
                    style={{ backgroundColor: "transparent" }} name="cpf"
                    value={cpf} onChange={(e) => setCpf(e.target.value)} />
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
                      <label htmlFor="rua">Rua</label>
                      <input type="text" className="form-control rua" id="rua"
                        aria-describedby="emailHelp" placeholder="Digite sua rua..."
                        style={{ backgroundColor: "transparent" }} name="rua"
                        value={rua} onChange={(e) => setRua(e.target.value)} />
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="numero">Número</label>
                      <input type="number" className="form-control numero" id="numero"
                        aria-describedby="emailHelp" placeholder="Digite o numero..."
                        style={{ backgroundColor: "transparent" }} name="numero"
                        value={numero} onChange={(e) => setNumero(e.target.value)} />
                    </div>
                  </div>
                </div>


                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px" }}>
                  <label for="exampleInputEmail1">Senha</label>
                  <input type="password" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Digite sua senha..."
                    style={{ backgroundColor: "transparent" }} name="senha"
                    value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>



                <center>
                  <button className="btn" type="submit" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white", marginTop: "2.5rem" }}>Cadastrar</button>
                </center>

              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}