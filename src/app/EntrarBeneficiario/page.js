"use client"
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import ErroEntrar from '../components/ErroEntrar';
import CustomButton from '../components/customButton';
import "./style.css";

export default function EntrarBeneficiario(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();
    const [erroEntrar, setErroEntrar] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email != "" && senha != ""){

        try{
            const response = await fetch("http://localhost:3001/EntrarBeneficiario", {
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
                console.log("Entrou!" + token);

                // Armazene o token no cabeçalho
                localStorage.setItem("token",token);
                localStorage.setItem("userType", "beneficiario");

                router.push("/");
    
              } else {
                const responseData = await response.json();
                if (responseData.msg === 'Usuário não encontrado!') {
                  setErroEntrar("Email Não Cadastrado!");
                } else if (responseData.msg === 'Senha inválida!'){
                  setErroEntrar("Senha ou Email Incorreto!");
                }
                console.error("Erro ao entrar beneficiário:", response.statusText);
                // Exibir uma mensagem de erro aqui
              }
            } catch (error) {
              console.error("Erro ao realizar requisição:", error.message);
              // Exibir uma mensagem de erro aqui
            } 
          } else {
              setErroEntrar("Preencha todos os campos!");
            }      
        };

    
    return(

      <div className='DPENTRARBENE' >
        <div className="BCENTRARBENE">

        <Navbar />


    <div className="DNENTRARBENE">
    <div className="DBNENTRABENE">

    <div className="DIEENTRARBENE">
      <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Não possui conta?</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Cadastre-se e concretize seus</p>
      <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>objetivos e demandas.</p>
      <CustomButton href="/CadastrarBeneficiario" className="button btn" buttonText="Cadastrar"/>
    </div>


    <div className="DFBENTRABENE">
        <center>
        <h1 className='h1EntrarENTRABENE'>Entrar como Beneficiário</h1>
        </center>
        <form onSubmit={handleSubmit}>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Email</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX" 
        style={{backgroundColor:"transparent"}} name="email"
        value={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Senha</label>
        <input type="password" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite sua senha..."
        style={{backgroundColor:"transparent"}} name="senha"
        value={senha} onChange={(e) => setSenha(e.target.value)}/>
        <div style={{ position: "absolute", right: 0, marginRight:"5%",marginTop:"10px"}}>
        <a href="/EsqueciSenha" style={{ color: "#ffffff", textDecoration: "underline" }}>Esqueceu sua senha?</a>
        </div>
    </div>
    {erroEntrar && <ErroEntrar erro={erroEntrar} />}

        <center>
        <button className="btn" type="submit" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white",marginTop:"35px"}}>Entrar</button>
        </center>
        </form>

    </div>
  </div>
</div>
</div>
</div>
    )
}