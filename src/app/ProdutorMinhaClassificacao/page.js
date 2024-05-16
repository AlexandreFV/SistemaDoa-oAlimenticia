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

export default function ProdutorMinhaClassificacao() {
    const router = useRouter();
    
   
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
                            <div style={{ display: "center", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "center", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Pontos Acumulados</h1>
                            
                                <div style={{ display: "flex", justifyContent: "center" }} className="altarclass">
                                <div className="caixa">
                                    <div style={{}}>
                                        <center>
                                            
                                            <img style={{ height: "3.2rem" }} src="/caixa_alimento.png" />
                                            
                                            <p>Quantidade de produtos enviados</p>
                                            <p>200 produtos</p>
                                            
                                        </center>
                                    </div>
                                </div>
                                <div className="trofeu">
                                    <div style={{}}>
                                        <center>
                                           
                                            <img style={{ height: "5rem" }} src="/trofeu.png" />
                                            
                                            <p>20.000 pontos</p>
                                            
                                        </center>
                                    </div>
                                </div>
                                <div className="lv">
                                    <div style={{}}>
                                        <center>
                                            
                                            <img style={{ height: "3.2rem" }} src="/estrela.png" />
                            
                                            <p>Nivel de Classificação</p>
                                            <p>23° Lugar</p>
                                            
                                        </center>
                                    </div>
                                </div>
                            </div>
                                
                                <button className="button">envie mais produtos</button>
                                
                                

                   
                                
                      </div>
                            
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        
        
        
    );
    
}