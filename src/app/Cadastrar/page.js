"use client"

import Link from "next/link";
import { FaInfoCircle } from 'react-icons/fa';
import Navbar from "../components/layoutCadastroLogin";
import Input from "../components/input";
import CustomButton from '../components/customButton';
import "./style.css";
import React, { useState, useEffect } from 'react';

export default function Cadastrar() {

  // Estado para controlar qual botão está ativo
  const [activeButton, setActiveButton] = useState(1);

  // Função para lidar com o clique do botão
  const handleButtonClick = (button) => {
    // Se o botão clicado for o mesmo que já está ativo, retorna sem fazer nada
    if (button === activeButton) {
      return;
    }

    // Define o botão clicado como ativo
    setActiveButton(button);
  };

  // Efeito para definir o botão "Produtor" como ativo ao carregar a página
  useEffect(() => {
    setActiveButton(1); // Define o botão "Produtor" como ativo
  }, []);

  return (
    <div className="DVP">
      <div className="BCKCC">

        <Navbar />
        <center>
          <p style={{ color: "white", fontSize: "2.375rem", fontStyle: "normal", lineHeight: "normal", marginTop: "3.45rem", marginBottom: "-2rem" }}>Escolha o tipo de cadastro</p>
        </center>
        <div className="DVN">
          <div className="DBN">
            <div className="colunaverde1">
              <a href="" className={activeButton === 1 ? 'active cardbtnprod' : 'cardbtnprod'} onClick={(e) => {
                e.preventDefault(); // Evita que o link seja seguido
                handleButtonClick(1);
              }}
              >

                <div className="nomeimgprod">
                  Produtor

                </div>
              </a>
              <a href="" className={activeButton === 2 ? 'active cardbtnbenef' : 'cardbtnbenef'}
                onClick={(e) => {
                  e.preventDefault(); // Evita que o link seja seguido
                  handleButtonClick(2);
                }}
              >
                <div className="nomeimgbenef" >
                  Beneficiário

                </div>
              </a>
            </div>
            <div id="fundoDoador" style={{ display: activeButton === 1 ? 'block' : 'none' }}>
              <div id="posfundoDoador">
                <span className="spanUser" id="span" data-toggle="modal" data-target="#modalDoador">
                  <p>Produtor</p>
                  <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
                </span>
                <img className="userwhitedoador" src="/userwhite.png" />

                <div className="DivButtonUserCadastro">
                  <CustomButton href="/EntrarProdutor" className="button btn" buttonText="Entrar" />
                  <CustomButton href="/CadastrarProdutor" className="button btn" buttonText="Cadastrar" />
                </div>
              </div>
            </div>
            <div id="fundoBenef" style={{ display: activeButton === 2 ? 'block' : 'none' }}>
              <div id="posfundoBenef">
                <span className="spanUser" id="span" data-toggle="modal" data-target="#modalBenef">
                  <p>Beneficiário</p>
                  <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
                </span>
                <img className="userwhiteBenef" src="/userwhite.png" />

                <div className="DivButtonUserCadastro">
                  <CustomButton href="/EntrarBeneficiario" className="button btn" buttonText="Entrar" />
                  <CustomButton href="/CadastrarBeneficiario" className="button btn" buttonText="Cadastrar" />
                </div>
              </div>
            </div>
            <div id="fundoIntermed" style={{ display: activeButton === 3 ? 'block' : 'none' }}>
              <div id="posfundoIntermed">
                <span className="spanUser" id="span" data-toggle="modal" data-target="#modalIntermed">
                  <p>Intermediário</p>
                  <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
                </span>
                <img className="userwhiteintermed" src="/userwhite.png" />

                <div className="DivButtonUserCadastro" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                  <CustomButton href="/EntrarIntermediario" className="button btn" buttonText="Entrar" />
                  <CustomButton href="/CadastrarIntermediario" className="button btn" buttonText="Cadastrar" />
                </div>
              </div>
            </div>
            <div id="fundoEmp" style={{ display: activeButton === 4 ? 'block' : 'none' }}>
              <div id="posfundoEmp">
                <span className="spanUser" id="span" data-toggle="modal" data-target="#modalEmp">
                  <p>Empresa</p>
                  <FaInfoCircle style={{ marginLeft: "0.2rem" }} id="info" />
                </span>
                <img className="userwhiteEmp" src="/userwhite.png" />

                <div className="DivButtonUserCadastro" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                  <CustomButton href="/EntrarIntermediario" className="button btn" buttonText="Entrar" />
                  <CustomButton href="/CadastrarIntermediario" className="button btn" buttonText="Cadastrar" />
                </div>
              </div>
            </div>
            <div className="colunaverde2">
              <a href="" className={activeButton === 3 ? 'active cardbtnIntermed' : 'cardbtnIntermed'}
                onClick={(e) => {
                  e.preventDefault(); // Evita que o link seja seguido
                  handleButtonClick(3);
                }}
              >
                <div className="nomeimgIntermed">
                  Intermediário

                </div>
              </a>
              <a href="" className={activeButton === 4 ? 'active cardbtnEmp' : 'cardbtnEmp'}
                onClick={(e) => {
                  e.preventDefault(); // Evita que o link seja seguido
                  handleButtonClick(4);
                }}
              >
                <div className="nomeimgEmp">
                  Empresa

                </div>
              </a>
            </div>

          </div>


        </div>


      </div>


      <div class="modal fade" id="modalDoador" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">

            <div class="modal-body" style={{ textAlign: 'center', height: "300px" }}>
              <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Produtor!</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Faça parte da mudança! Com seus produtos do campo não comercializáveis, você pode alimentar aqueles que mais precisam.</p>
              <p style={{ marginTop: "20px", color: "#578925", fontFamily: "Inter", fontWeight: "bold" }}>Doe agora e faça a diferença!</p>
              <button data-dismiss="modal" class="btn" style={{ marginTop: "20px", backgroundColor: "#3FADB4", color: "white" }}>Entendi</button>
            </div>

          </div>
        </div>
      </div>


      <div class="modal fade" id="modalIntermed" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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

      <div class="modal fade" id="modalBenef" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">

            <div class="modal-body" style={{ textAlign: 'center', height: "300px" }}>
              <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Seja Beneficiário!</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Como beneficiário, você está prestes a receber a generosidade de muitos. Graças aos intermediários, os produtos doados pelos doadores chegarão até você, trazendo conforto e esperança.</p>
              <p style={{ marginTop: "20px", color: "#578925", fontFamily: "Inter", fontWeight: "bold" }}>Tenha uma vida melhor, sem preocupações!</p>
              <button data-dismiss="modal" class="btn" style={{ marginTop: "20px", backgroundColor: "#3FADB4", color: "white" }}>Entendi</button>
            </div>

          </div>
        </div>
      </div>

      <div class="modal fade" id="modalEmp" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <div class="modal-body" style={{ textAlign: 'center', height: "300px" }}>
              <h1 style={{ fontSize: "25px", marginBottom: "30px", marginTop: "-1rem", fontFamily: "Inter", fontWeight: "800" }}>Seja Contribuinte!</h1>
              <p style={{ fontFamily: "Inter", fontWeight: "400" }}>Como empresa, sua participação implica no envio de um valor definido por você, que será direcionado ao intermediário. Esses fundos possibilitarão que o intermediário adquira os produtos oferecidos pelos produtores, contribuindo para uma rede solidária.</p>
              <p style={{ marginTop: "20px", color: "#578925", fontFamily: "Inter", fontWeight: "bold" }}>Invista agora no futuro de pessoas <br /> que mais precisam</p>
              <button data-dismiss="modal" class="btn" style={{ marginTop: "10px", backgroundColor: "#3FADB4", color: "white" }}>Entendi</button>
            </div>

          </div>
        </div>
      </div>

    </div>



  );
}
/*


            

            
*/