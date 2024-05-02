
"use client"
import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import ErroEntrar from '../components/ErroEntrar';
import CustomButton from '../components/customButton';
import "./style.css";

export default function EsqueciSenha(){

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccessMessage("");
      setIsLoading(true);
  
      try {
        const response = await  fetch("http://localhost:3001/solicitar-troca-senha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Erro ao enviar solicitação");
        }
        setSuccessMessage(data.message);
      } catch (error) {
        setError(error.message);
      }
  
      setIsLoading(false);
    };

    return(

        <div className='DPENTRAREMPRESA' >
        <div className="BCENTRAREMPRESA">

        <Navbar />


    <div className="DNENTRAREMPRESA">


    <div className="DFBEsqueciSenha">
        <div style={{color:"white",width:"100%",height:"100%"}}>
        <center>
        <h1 className="h1EsqueciSenha">Solicitar Troca de Senha</h1>
        <p style={{paddingTop:"10px"}}>Digite o Email para troca de Senha</p>
        </center>

        <form onSubmit={handleFormSubmit}>

        <div className="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px", color: "black" }}>


<div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px",color:"white"}}>
        <label for="exampleInputEmail1">Email</label>

          <input
    type="email" class="form-control" id="exampleInputEmail1" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
    </div>
</div>




        <center>
        {error && <p className="error alert alert-danger" style={{width:"60%",marginTop:"10px"}}>{error}</p>}
        {successMessage && <p className="success alert alert-success" style={{width:"80%",marginTop:"10px"}}>{successMessage}</p>}
        <button className="btn" type="submit" disabled={isLoading} style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white",marginTop:"15px"}}>
          {isLoading ? "Enviando..." : "Confirmar"}
        </button>
        </center>
        </form>

    </div>
    </div>

  </div>
</div>
</div>
    )
}