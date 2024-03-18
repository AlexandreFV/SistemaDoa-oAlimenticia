"use client"
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import ErroCadastro from '../components/ErroCadastro';
import CustomButton from '../components/customButton';
import "./style.css";

export default function CadastroIntermediario(){

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const [cadastroConcluido, setCadastroConcluido] = useState(false); // Estado para indicar se o cadastro foi concluído
    const router = useRouter();
    const [erroCadastro, setErroCadastro] = useState(""); // Estado para armazenar a mensagem de erro

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(nome != "" && email != "" && cnpj != "" && senha != ""){

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
            }
            console.error("Erro ao cadastrar doador:", response.statusText);
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
    

    return(

      <div className='DivPai' >
      <div className="background-Cadastro">

        <Navbar />


        <div className='DivNeto' >
        <div className='DivBisNeto'>

        <div className='DivInfCadast'>
      <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Já possui conta?</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Entre e continue sua jornada de </p>
        <p style={{ fontFamily: "Inter", fontWeight: "400",marginBottom: "20px"}}>transmissão de esperança..</p>
        <CustomButton href="/EntrarIntermediario" className="button btn" buttonText="Entrar"/>
    </div>

    <div className="DivFundoBranco">
        <center>
        <h1 className='h1Cadastrar'>Cadastro Intermediario</h1>
        </center>

        <form onSubmit={handleSubmit}>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Nome Completo</label>
        <input type="text" class="form-control" id="exampleInputEmail1" name="nome"
        aria-describedby="emailHelp" placeholder="Digite seu nome completo..." 
        style={{backgroundColor:"transparent"}}
        value={nome} onChange={(e) => setNome(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Email</label>
        <input type="Email" class="form-control" id="exampleInputEmail1" name="email"
        aria-describedby="emailHelp" placeholder="Digite seu e-mail..." 
        style={{backgroundColor:"transparent"}}
        value={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">CNPJ</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX" name="cnpj"
        style={{backgroundColor:"transparent"}}
        value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Senha</label>
        <input type="password" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite sua senha..." name="senha"
        style={{backgroundColor:"transparent"}}
        value={senha} onChange={(e) => setSenha(e.target.value)} />
    </div>
    
    {erroCadastro && <ErroCadastro erro={erroCadastro} />}
        <center>
        <button className="btn" type="submit" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white",marginTop:"0px"}}>Cadastrar</button>
        </center>
        </form>

    </div>
  </div>
</div>
</div>
</div>
    )
}