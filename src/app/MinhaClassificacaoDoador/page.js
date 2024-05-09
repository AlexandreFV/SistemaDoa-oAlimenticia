"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import { BackButton, CustomButton } from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";

export default function MinhaClassificacaoDoador() {
    const router = useRouter();
    const [posicao, setPosicao] = useState("");
    const [minhasInfo, setInfo] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          router.push('/Cadastrar');
        } else {
          const UserType = localStorage.getItem('userType');
          if (UserType !== 'doador') {
            router.push("/PermissaoNegada");
          }
        }
      }, []);
      
    useEffect(() => {
        const minhaClassificação = async () =>{
        try{
        const token = localStorage.getItem("token");
        
        const response = await fetch ("http://localhost:3001/MeuRanking",{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });
        if(response.ok)
        {
         const Classificação = await response.json();
          setPosicao(Classificação.posicao);
          setInfo(Classificação.minhaColocação);
        }
        } catch(erro){  
            console.log("Erro ao buscar Classificação");
        }
        };
        minhaClassificação();
    },[])
   
    return (
        
        <div className="DVBF">
            <Navbar></Navbar>
            <div className="DFBF">
                <MenuDireito />
                <div className="DIBF">
                    <div className="DFPBF">
                        <BackButton />
                        <h1 className="HMDBF">Minha Classificação</h1>
                        <div className="DFFBF">
                        {minhasInfo === 0 ? (
                        <div>
                        <img src="/triste.png" className="IT"></img>
                        <h1 className="HND">Você ainda não efetuou nenhuma venda.</h1>
                        <p className="PSP">Seja parte da solução.</p>
                        <p className="PSPD">Sua primeira venda é o primeiro passo para um mundo melhor.</p>
                        <CustomButton href={"/facaDoacao"} className={"BPN"} buttonText={"Doe agora"} />
                        </div>
                        ) : (
                            <div style={{ display: "center", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "center", justifyContent: "center", alignItems: "center"}} className="h1ProdutosEnv">Pontos Acumulados</h1>
                            
                                <div style={{ display: "flex", justifyContent: "center" }} className="altarclass">
                                <div className="caixa">
                                    <div style={{}}>
                                        <center>
                                            
                                            <img style={{ height: "3.2rem" }} src="/caixa_alimento.png" />
                                            
                                            <p>Quantidade de produtos vendidos</p>
                                            <p>{minhasInfo.quantidade}</p>
                                            
                                        </center>
                                    </div>
                                </div>
                                <div className="trofeu">
                                    <div style={{}}>
                                        <center>
                                           
                                            <img style={{ height: "5rem" }} src="/trofeu.png" />
                                            
                                            <p>Sua Posição {posicao}°</p>
                                            
                                        </center>
                                    </div>
                                </div>
                                {/* <div className="lv">
                                    <div style={{}}>
                                        <center>
                                            
                                            <img style={{ height: "3.2rem" }} src="/estrela.png" />
                            
                                            <p>Nivel de Classificação</p>
                                            <p>23° Lugar</p>
                                            
                                        </center>
                                    </div>
                                </div> */}
                            </div>
                                
                                <button className="button">envie mais produtos</button>
                                
                                

                   
                                
                      </div>
                            
                        )}

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        
        
        
    );
    
}