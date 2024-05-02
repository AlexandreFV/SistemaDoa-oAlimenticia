"use client"

import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import ErroEntrar from '../components/ErroEntrar';
import CustomButton from '../components/customButton';
import "./style.css";

export default function EntrarIntermediario(){
        const [email, SetEmail] = useState("");
        const [senha, setSenha] = useState("");
        const [erroEntrar, setErroEntrar] = useState("");
        const router = useRouter();

        const handleSubmit = async (event) => {
            event.preventDefault();

        if(email != "" && senha != ""){

            try{
                const response = await fetch ("http://localhost:3001/EntrarIntermediario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify ({
                        email,
                        senha,
                    }),
                });

                if(response.ok){
                    const data = await response.json(); // Extrai o corpo da resposta como JSON
                    const token = data.token; // Assume que a resposta contém um campo 'token'
                    console.log("Entrou!" + token);

    
                    // Armazene o token no cabeçalho
                    localStorage.setItem("token",token);
                    localStorage.setItem("userType", "intermediario");

                    router.push("/");                    
                } else {
                    const data = await response.json();
                    if(data.msg === "Usuário não encontrado!"){
                        setErroEntrar("Email não Encontrado");
                    } else if (data.msg === "Senha inválida!"){
                        setErroEntrar("Email ou Senha Incorretos");
                    }
                    console.error("Erro ao entrar Intermediario:", response.statusText);

                }
            } catch (error){
                console.error("Erro ao realizar requisição:", error.message);
            } 
        } else {
            setErroEntrar("Preencha todos os Campos!");
        }
        };

    return(

        <div className='DPENTRARINTERMED' >
        <div className="BCENTRARINTERMED">

        <Navbar />


    <div className="DNENTRARINTERMED">
    <div className="DBNENTRARINTERMED">

    <div className="DIEENTRARINTERMED">
      <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Não possui conta?</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Cadastre-se e comece o caminho para emitir </p>
      <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>otimismo e prosperidade.</p>
      <CustomButton href="/CadastrarIntermediario" className="button btn" buttonText="Cadastrar"/>
    </div>

    <div className="DFBENTRARINTERMED">
        <center>
        <h1 className='h1EntrarENTRARINTERMED'>Entrar como Intermediario</h1>
        </center>
        <form onSubmit={handleSubmit}>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Email</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX" 
        style={{backgroundColor:"transparent"}} name="email"
        value={email} onChange={(e) => SetEmail(e.target.value)}/>
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