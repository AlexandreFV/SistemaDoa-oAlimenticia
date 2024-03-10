import Link from "next/link";
import { FaInfoCircle } from 'react-icons/fa';
import Navbar from "../components/layoutCadastroLogin";

export default function Cadastrar() {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="background-Cadastro">
        
      <Navbar />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
        <div style={{ backgroundColor: "#EDEDED", height: "450px", width: "60%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>
        
        <div id="fundoDoador">
            <span style={{display:"flex"}} id="span" data-toggle="modal" data-target="#modalDoador">
            <p>Doador</p>    
            <FaInfoCircle id="info"/>
            </span>          
              <img src="/Loign.png" width={"150px"}/>

            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <Link href="/EntrarDoador"><button class="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color:"white",
            width:"100px",height:"40px"}}>Entrar</button></Link>
            <Link href="/CadastrarDoador"><button class="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color:"white",
            width:"100px",height:"40px"}}>Cadastrar</button></Link>     
            </div>

        </div>

        <div id="fundoIntermediario">
        <span style={{display:"flex"}} id="span" data-toggle="modal" data-target="#modalIntermediario">
            <p>Intermediario</p>    
            <FaInfoCircle id="info"/>
            </span>
            <img src="/Loign.png" width={"150px"}/>

            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <Link href="/EntrarIntermediario"><button class="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color:"white",
             width:"100px",height:"40px", visibility:"0"}}>Entrar</button></Link>
             <Link href="/CadastrarIntermediario"><button class="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color:"white",
             width:"100px",height:"40px", visibility:"0"}}>Cadastrar</button></Link>
            </div>

        </div>

        <div id="fundoReceptor">
        <span style={{display:"flex"}} id="span" data-toggle="modal" data-target="#modalReceptor">
            <p>Beneficiário</p>    
            <FaInfoCircle id="info"/>
            </span>          
              <img src="/Loign.png" width={"150px"}/>

            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <Link href="/EntrarBeneficiario"><button class="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color:"white",
            width:"100px",height:"40px"}}>Entrar</button></Link>
            <Link href="/CadastrarBeneficiario"><button class="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color:"white",
            width:"100px",height:"40px"}}>Cadastrar</button>   </Link>  
            </div>
            
        </div>

          </div>
        </div>

        
      </div>

      
      <div class="modal fade" id="modalDoador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
    
      <div class="modal-body" style={{ textAlign: 'center',height:"300px"}}>
      <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Doador!</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Faça parte da mudança! Com seus produtos do campo não comercializáveis, você pode alimentar aqueles que mais precisam.</p>
      <p style={{marginTop:"20px", color:"#578925", fontFamily: "Inter", fontWeight: "bold"}}>Doe agora e faça a diferença!</p>
      <button data-dismiss="modal" class="btn" style={{marginTop:"20px", backgroundColor:"#3FADB4", color:"white"}}>Entendi</button>
      </div>
      
      </div>
      </div>
      </div>


      <div class="modal fade" id="modalIntermediario" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
    
      <div class="modal-body" style={{ textAlign: 'center',height:"300px"}}>
      <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Intermediário!</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Como intermediário, você desempenha um papel crucial na ligação entre doadores e beneficiários. Sua missão é garantir que os produtos doados alcancem aqueles que mais precisam.</p>
      <p style={{marginTop:"20px", color:"#578925", fontFamily: "Inter", fontWeight: "bold"}}>Faça a diferença ainda hoje!</p>
      <button data-dismiss="modal" class="btn" style={{marginTop:"20px", backgroundColor:"#3FADB4", color:"white"}}>Entendi</button>
      </div>
      
      </div>
      </div>
      </div>

      <div class="modal fade" id="modalReceptor" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
    
      <div class="modal-body" style={{ textAlign: 'center',height:"300px"}}>
      <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Beneficiário!!</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Como beneficiário, você está prestes a receber a generosidade de muitos. Graças aos intermediários, os produtos doados pelos doadores chegarão até você, trazendo conforto e esperança.</p>
      <p style={{marginTop:"20px", color:"#578925", fontFamily: "Inter", fontWeight: "bold"}}>Tenha uma vida melhor, sem preocupações!</p>
      <button data-dismiss="modal" class="btn" style={{marginTop:"20px", backgroundColor:"#3FADB4", color:"white"}}>Entendi</button>
      </div>
      
      </div>
      </div>
      </div>

    </div>



  );
}
