"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/MenuIntermediario";
import { BackButton, CustomButton } from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";
import ProdutosBenef from "./ProdutosBenef/page";
export default function ListProdutorIntermed() {

    const router = useRouter();
    const [beneficiario, setBenef] = useState([]);
    const [idBenef, setIdBenef] = useState(null); // Estado para armazenar o ID
    const [nomeBenef, setNomeBenef] = useState(null);
    const[ExisteProd, setExisteProd] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
         
        if(!token){
            router.push("/Cadastrar");
        }else {

        const userType = localStorage.getItem("userType");
        if(userType != "intermediario"){
            router.push("/PermissaoNegadaIntermediario");
        }
        } 
    })

    useEffect(() => {
        const beneficiariosDisp = async () => {
              try{
                const token = localStorage.getItem('token');
                const decodedToken = jwt.decode(token);
                const usuarioIntermeId = decodedToken.id;

                const response = await fetch (`http://localhost:3001/ListarBeneficiario/${usuarioIntermeId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                });
                if(response.ok){
                const data = await response.json();
                setBenef(data.beneficiariosDispo);
                // console.log(beneficiario);

                const response2 = await fetch (`http://localhost:3001/MeusProdutosDisponiveisParaDoacao/${usuarioIntermeId}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                    },
              });

              if (!response2.ok) {
                const data2 = await response2.json();
                if (!data2.doacoesColetadas || data2.doacoesColetadas.length === 0) {
                    setExisteProd(false);
                }
              }else{
                setExisteProd(true);
              }
          
                } 
              } catch (error){
                console.error('Erro ao buscar doações:', error.message);
              }
        }; 
        beneficiariosDisp();
    }, []);

    
    const handleExibirBenef = async (idBenef, nomeBenef) => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const usuariodoadorId = decodedToken.id;
            
            const response = await fetch(`http://localhost:3001/ProdutosBenef/${idBenef}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setIdBenef(idBenef);
                setNomeBenef(nomeBenef);
                // router.push('/ProdutosBenef');

            } else {
                console.log("Tws");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
          {idBenef ? (
            <ProdutosBenef idBenef={idBenef} nomeBenef={nomeBenef} />
          ) : (
            <div className="DPLISTBENE">
              <Navbar />
              <div className="DFINFOPROD">
                <MenuDireito />
                <div className="DIINFOPROD">
                  <div className="DFPINFOPROD">
                    <BackButton />
                    <h1 className="h1MinDoaINFOPROD">Enviar produtos doados</h1>
                    <div className="DFFINFOPROD">
                      <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                        <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnvINFOPROD">Beneficiários ativos Para Enviar Produtos</h1>
                        <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                          <img src="./filtrar.png" className="imgFiltrarINFOPROD" />
                          <p >Filtro</p>
                        </div>
                      </div>
                      <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                      <>
                        {beneficiario.length === 0 ? (
                          <div>Nenhum beneficiário disponível na sua Cidade</div>
                        ) : (
                          <div>
                            {beneficiario.map((bene, index) => (
                              <div key={index} className="CardProduct" style={{ width: "90%", height: "9rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>
                                <div style={{ float: "left", flexWrap: "wrap", marginLeft: "0", marginRight: "0" }}>
                                  <div style={{ marginLeft: "2rem", marginTop: "1rem", fontSize: 18, fontFamily: "Inter", fontWeight: "bold" }}> {bene.nome}</div>
                                  <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                    <img src="/icon_document.png" style={{ marginRight: "0.1rem", width: "1.3rem" }}></img>CNPJ/CPF: {bene.cpf}
                                  </div>
                                  <div style={{ marginLeft: "2rem", marginTop: "0.5rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                    <img src="/icon_tel.png" style={{ marginRight: "0.32rem", width: "1.1rem" }}></img>Contato: {bene.telefone}
                                  </div>
                                </div>
                                <div className="linha_vertical" style={{ backgroundColor: "black", height: "100%", width: "2px", marginLeft: "auto", marginRight: "0" }}></div>
                                <div style={{ flexWrap: "wrap", marginLeft: "2rem", marginRight: "auto", marginTop: "1rem" }}>
                                  <p style={{ maxWidth: "220px", width: "220px" }}>Localização: {bene.rua}, {bene.numero} - {bene.telefone}</p>
                                </div>
                                <button style={{marginRight:"10px",padding:"0px", opacity: ExisteProd ? "1" : "0.5",pointerEvents: ExisteProd ? "auto" : "none"}} onClick={() => handleExibirBenef(bene.id, bene.nome)}>
                                                <span>Enviar</span>
                                                <img src="./car.png" className="carImg" alt="Car"></img>

                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }      