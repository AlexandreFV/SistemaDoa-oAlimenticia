"use client"
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import ErroCadastro from '../components/erroCadastro';
import CustomButton from '../components/customButton';
import "./style.css";

export default function CadastrarEmpresa(){

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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(nome != "" && email != "" && cnpj != "" && senha != "" && rua != "" && cidade != "" && numero != "" && telefone != ""){

        try {
          const response = await fetch("http://localhost:3001/CadastrarEmpresa", {
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
              telefone
            }),
          });
    
          if (response.ok) {
            console.log("Cadastro realizado com sucesso!");
            // Redirecionar ou exibir uma mensagem de sucesso aqui
            setCadastroConcluido(true); // Atualiza o estado para indicar que o cadastro foi concluído
            router.push('/EntrarEmpresa');

          } else {
            const responseData = await response.json();
            if (responseData.msg === 'E-mail já está em uso por outro usuário!') {
              setErroCadastro("E-mail já está em uso!");
            }
            console.error("Erro ao cadastrar empresa:", response.statusText);
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

      <div className='DPCE' >
      <div className="BCCE">

        <Navbar />


        <div className='DNCE' >
        <div className='DBNCE'>

        <div className='DICCE'>
      <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Já possui conta?</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Entre e contribua para um </p>
        <p style={{ fontFamily: "Inter", fontWeight: "400",marginBottom: "20px"}}>Futuro melhor.</p>
        <CustomButton href="/EntrarEmpresa" className="button btn" buttonText="Entrar"/>
        {erroCadastro && <ErroCadastro erro={erroCadastro} />}

    </div>

    <div className="DFBCE">
        <center>
        <h1 className='h1CadastrarCE'>Cadastro Empresa</h1>
        </center>

        <form onSubmit={handleSubmit}>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Nome da Empresa</label>
        <input type="text" class="form-control" id="exampleInputEmail1" name="nome"
        aria-describedby="emailHelp" placeholder="Digite o nome da empresa..." 
        style={{backgroundColor:"transparent"}}
        value={nome} onChange={(e) => setNome(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"10px"}}>
        <label for="exampleInputEmail1">Email</label>
        <input type="Email" class="form-control" id="exampleInputEmail1" name="email"
        aria-describedby="emailHelp" placeholder="Digite seu e-mail..." 
        style={{backgroundColor:"transparent"}}
        value={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"10px"}}>
        <label for="exampleInputEmail1">CNPJ</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="XX.XXX.XXX/XXXX-XX" name="cnpj"
        style={{backgroundColor:"transparent"}}
        value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"10px"}}>
    <div className="row">

    <div className="col-sm-6">

<label for="exampleInputEmail1">Telefone</label>
<input type="text" class="form-control" id="exampleInputEmail1" 
aria-describedby="emailHelp" placeholder="Digite seu Telefone..."
style={{backgroundColor:"transparent"}} name="telefone" 
value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
</div>

    <div className="col-sm-6">

        <label for="exampleInputEmail1">Cidade</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite sua cidade..."
        style={{backgroundColor:"transparent"}} name="cidade" 
        value={cidade} onChange={(e) => setCidade(e.target.value)}/>
        </div>

        </div>
    </div>




    <div className="form-group" style={{width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "10px"}}>
    <div className="row">
        <div className="col-sm-6">
            <label htmlFor="rua">Rua</label>
            <input type="text" className="form-control rua" id="rua" 
                   aria-describedby="emailHelp" placeholder="Digite sua rua..."
                   style={{backgroundColor: "transparent"}} name="rua" 
                   value={rua} onChange={(e) => setRua(e.target.value)}/>
        </div>
        
        <div className="col-sm-6">
            <label htmlFor="numero">Número</label>
            <input type="number" className="form-control numero" id="numero" 
                   aria-describedby="emailHelp" placeholder="Digite o numero..."
                   style={{backgroundColor: "transparent"}} name="numero" 
                   value={numero} onChange={(e) => setNumero(e.target.value)}/>
        </div>
    </div>
</div>


    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"10px"}}>
        <label for="exampleInputEmail1">Senha</label>
        <input type="password" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite sua senha..." name="senha"
        style={{backgroundColor:"transparent"}}
        value={senha} onChange={(e) => setSenha(e.target.value)} />
    </div>
    
        <center>
        <button className="btn" type="submit" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white",marginTop:"10px"}}>Cadastrar</button>
        </center>
        </form>

    </div>
  </div>
</div>
</div>
</div>
    )
}