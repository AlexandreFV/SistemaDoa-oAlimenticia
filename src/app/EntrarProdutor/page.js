"use client"

import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import ErroEntrar from '../components/ErroEntrar';
import CustomButton from '../components/customButton';
import "./style.css";
import { BackButton } from "../components/BackButton";

export default function EntrarDoador() {
  const [email, SetEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();
  const [erroEntrar, setErroEntrar] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email != "" && senha != "") {

      try {
        const response = await fetch("http://localhost:3001/EntrarDoador", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senha,
            email,
          }),
        });

        if (response.ok) {
          const data = await response.json(); // Extrai o corpo da resposta como JSON
          const token = data.token; // Assume que a resposta contém um campo 'token'
          const idStripe = data.userStripeId;

          console.log("Entrou!" + token);


          // Armazene o token no cabeçalho
          localStorage.setItem("token", token);
          localStorage.setItem("userType", "doador");
          localStorage.setItem("IdStripe", idStripe);
          router.push("/");

        } else {
          const responseData = await response.json();
          if (responseData.msg === 'Usuário não encontrado!') {
            setErroEntrar("Email Não Cadastrado!");
          } else if (responseData.msg === 'Senha inválida!') {
            setErroEntrar("Senha ou Email Incorreto!");
          }
          console.error("Erro ao entrar beneficiário:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao realizar requisição:", error.message);
      }
    } else {
      setErroEntrar("Preencha todos os campos!");
    }
  };

  return (

    <div className='DPENTRARDOADOR' >
      <div className="BCENTRARDOADOR">

        <Navbar />
        <BackButton />


        <div className="DNENTRARDOADOR">
          <div className="DBNENTRARDOADOR">

            <div className="DIEENTRARDOADOR">
              <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Não possui conta?</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Cadastre-se e ajude pessoas </p>
              <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>com necessidades..</p>
              <CustomButton href="/CadastrarProdutor" className="button btn" buttonText="Cadastrar" />
            </div>

            <div className="DFBENTRARDOADOR">
              <center>
                <h1 className='h1EntrarENTRARDOADOR'>Entrar como Produtor</h1>
              </center>
              <form onSubmit={handleSubmit}>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                  <label for="exampleInputEmail1">Email</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX"
                    style={{ backgroundColor: "transparent" }} name="email"
                    value={email} onChange={(e) => SetEmail(e.target.value)} />
                </div>

                <div class="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px" }}>
                  <label for="exampleInputEmail1">Senha</label>
                  <input type="password" class="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Digite sua senha..."
                    style={{ backgroundColor: "transparent" }} name="senha"
                    value={senha} onChange={(e) => setSenha(e.target.value)} />
                  <div style={{ position: "absolute", right: 0, marginRight: "5%", marginTop: "10px" }}>
                    <a href="/EsqueciSenha" style={{ color: "#ffffff", textDecoration: "underline" }}>Esqueceu sua senha?</a>
                  </div>
                </div>

                {erroEntrar && <ErroEntrar erro={erroEntrar} />}


                <center>
                  <button className="btn" type="submit" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white", marginTop: "35px" }}>Entrar</button>
                </center>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}