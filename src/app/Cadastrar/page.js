import Link from "next/link";
import { FaInfoCircle } from 'react-icons/fa';
import Navbar from "../components/layoutCadastroLogin";
import Input from "../components/input";
import CustomButton from '../components/customButton';
import "./style.css";

export default function Cadastrar() {
  return (
    <div className="DVC">
      <div className="BCKCC">

        <Navbar />
        <center>
          <p style={{ color: "white", fontSize: "2.375rem", fontStyle: "normal", lineHeight: "normal", marginTop: "3.45rem", marginBottom: "-2rem" }}>Escolha o tipo de cadastro</p>
        </center>
        <div className="DNC">
          <div className="DBNC">

            <div id="FDC">
              <span className="spanUser" id="span" data-toggle="modal" data-target="#modalDoador">
                <p>Doador</p>
                <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
              </span>
              <img className="UBD" src="/Loign.png" width={"150px"} />
              <img className="UWD" src="/userwhite.png" width={"150px"} />

              <div className="DBUC">
                <CustomButton href="/EntrarDoador" className="button btn" buttonText="Entrar" />
                <CustomButton href="/CadastrarDoador" className="button btn" buttonText="Cadastrar" />
              </div>

            </div>

            <div id="FIC">
              <span className="spanUser" id="span" data-toggle="modal" data-target="#modalIntermediario">
                <p>Intermediario</p>
                <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
              </span>
              <img className="UBIC" src="/Loign.png" width={"150px"} />
              <img className="UWIC" src="/userwhite.png" width={"150px"} />

              <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                <CustomButton href="/EntrarIntermediario" className="button btn" buttonText="Entrar" />
                <CustomButton href="/CadastrarIntermediario" className="button btn" buttonText="Cadastrar" />
              </div>

            </div>

            <div id="FRC">
              <span className="spanUser" id="span" data-toggle="modal" data-target="#modalReceptor">
                <p>Beneficiário</p>
                <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
              </span>
              <img className="UBRC" src="/Loign.png" width={"150px"} />
              <img className="UWRC" src="/userwhite.png" width={"150px"} />

              <div className="DivButtonUser">
                <CustomButton href="/EntrarBeneficiario" className="button btn" buttonText="Entrar" />
                <CustomButton href="/CadastrarBeneficiario" className="button btn" buttonText="Cadastrar" />
              </div>

            </div>

          </div>
        </div>


      </div>


      <div class="modal fade" id="modalDoador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">

            <div class="modal-body" style={{ textAlign: 'center', height: "300px" }}>
              <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Doador!</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Faça parte da mudança! Com seus produtos do campo não comercializáveis, você pode alimentar aqueles que mais precisam.</p>
              <p style={{ marginTop: "20px", color: "#578925", fontFamily: "Inter", fontWeight: "bold" }}>Doe agora e faça a diferença!</p>
              <button data-dismiss="modal" class="btn" style={{ marginTop: "20px", backgroundColor: "#3FADB4", color: "white" }}>Entendi</button>
            </div>

          </div>
        </div>
      </div>


      <div class="modal fade" id="modalIntermediario" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">

            <div class="modal-body" style={{ textAlign: 'center', height: "300px" }}>
              <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Intermediário!</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Como intermediário, você desempenha um papel crucial na ligação entre doadores e beneficiários. Sua missão é garantir que os produtos doados alcancem aqueles que mais precisam.</p>
              <p style={{ marginTop: "20px", color: "#578925", fontFamily: "Inter", fontWeight: "bold" }}>Faça a diferença ainda hoje!</p>
              <button data-dismiss="modal" class="btn" style={{ marginTop: "20px", backgroundColor: "#3FADB4", color: "white" }}>Entendi</button>
            </div>

          </div>
        </div>
      </div>

      <div class="modal fade" id="modalReceptor" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">

            <div class="modal-body" style={{ textAlign: 'center', height: "300px" }}>
              <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Beneficiário!!</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Como beneficiário, você está prestes a receber a generosidade de muitos. Graças aos intermediários, os produtos doados pelos doadores chegarão até você, trazendo conforto e esperança.</p>
              <p style={{ marginTop: "20px", color: "#578925", fontFamily: "Inter", fontWeight: "bold" }}>Tenha uma vida melhor, sem preocupações!</p>
              <button data-dismiss="modal" class="btn" style={{ marginTop: "20px", backgroundColor: "#3FADB4", color: "white" }}>Entendi</button>
            </div>

          </div>
        </div>
      </div>

    </div>



  );
}
