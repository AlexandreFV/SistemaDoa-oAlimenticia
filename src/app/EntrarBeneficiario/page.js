"use client"
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

export default function EntrarBeneficiario(){
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:3001/EntrarBeneficiario", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  senha,
                  cpf,
                }),
              });
        
              if (response.ok) {
                const data = await response.json(); // Extrai o corpo da resposta como JSON
                const token = data.token; // Assume que a resposta contém um campo 'token'
                const userType = data.userType;
                const decoded = jwtDecode(token);
                const userId = decoded.id;
                console.log("Entrou!" + token);
                console.log("Token de autenticação:", token);
                console.log("id:", userId);

                // Armazene o token no cabeçalho
                localStorage.setItem("token",token);
                localStorage.setItem("userType",userType);
                localStorage.setItem('userId', userId); // Armazena o ID do usuário logado

                router.push("/");
    
              } else {
                console.error("Erro ao entrar beneficiário:", response.statusText);
                // Exibir uma mensagem de erro aqui
              }
            } catch (error) {
              console.error("Erro ao realizar requisição:", error.message);
              // Exibir uma mensagem de erro aqui
            } 
        };

    
    return(

        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="background-Cadastro">

        <Navbar />


    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
    <div style={{ backgroundColor: "#EDEDED", height: "450px", width: "60%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",position:"absolute",left:0,marginLeft:"100px" }}>
      <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Não possui conta?</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Cadastre-se e concretize seus</p>
      <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>objetivos e demandas.</p>
      <Link href="/CadastrarBeneficiario"><button className="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white", width: "100px", height: "40px" }}>Cadastrar</button></Link>
    </div>


    <div style={{ color: "white", backgroundColor: "#578925", width: "430px", height: "500px", borderRadius: "10px", position: "absolute", right: 0, marginRight: "50px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <center>
        <h1 style={{ fontSize: "25px", marginTop: "30px", fontFamily: "Poller One cursive", fontWeight: "800" }}> Entrar como Beneficiário</h1>
        </center>
        <form onSubmit={handleSubmit}>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">CPF</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX" 
        style={{backgroundColor:"transparent"}} name="cpf"
        value={cpf} onChange={(e) => setCpf(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Senha</label>
        <input type="password" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite sua senha..."
        style={{backgroundColor:"transparent"}} name="senha"
        value={senha} onChange={(e) => setSenha(e.target.value)}/>
        <div style={{ position: "absolute", right: 0, marginRight:"5%",marginTop:"10px"}}>
        <a href="#" style={{ color: "#ffffff", textDecoration: "underline" }}>Esqueceu sua senha?</a>
        </div>
    </div>
        <center>
        <button className="btn" type="submit" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white",marginTop:"60px"}}>Entrar</button>
        </center>
        </form>

    </div>
  </div>
</div>
</div>
</div>
    )
}