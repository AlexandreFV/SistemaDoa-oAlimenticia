"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import { BackButton } from "../components/customButton";
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";
import CustomButton from "../components/customButton";

export default function interMinhaClassificacao() {
    const router = useRouter();
    const [MeuRanking, setMeuRanking] = useState("");
    const [posicao, setPosicao] = useState("");
    useEffect(() => {
        const MeuRanking = async () =>{

            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const usuariodoadorId = decodedToken.id;

            try{
            const response =await fetch(`http://localhost:3001/MeuRanking`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            })
            if (response.ok){
                const data = await response.json();
                setMeuRanking(data.minhaColocação);
                setPosicao(data.posicao);
            }else {
                console.error('Erro ao buscar sua classificacao:', response.statusText);
              }

            }catch(error){
                console.error('Erro ao buscar classificacao:', error.message);
            }
        }; MeuRanking();
    }, []);
   
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
                        <div style={{ textAlign: "center",height:"80%"  }}>
                        <h1 style={{ justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Pontos Acumulados</h1>
                        
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",height:"90%",marginLeft:"100px",marginRight:"100px" }} className="altarclass">
    <div className="">
        <div>
            <center>
                <img style={{ height: "5rem" }} src="/caixa_alimento.png" alt="Caixa Alimento"/>
                <p>Quantidade de Vendas</p>
                <p>{MeuRanking.quantidade}</p>
            </center>
        </div>
    </div>
    <div className="">
        <div>
            <center>
                <img style={{ height: "5rem" }} src="/trofeu.png" alt="Trofeu"/>
                <p>Nivel de Classificação</p>
                <p>{posicao}º</p>
            </center>
        </div>
    </div>
</div>
    
                <CustomButton href={"/"} className={"BPNTES"} buttonText={"Inicio"}>envie mais produtos</CustomButton>
                                
                                

                   
                                
                      </div>
                            
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        
        
        
    );
    
}