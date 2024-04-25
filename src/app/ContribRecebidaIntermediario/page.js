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

export default function ContribRecebidaIntermediario() {
    const router = useRouter();
    
   
    return (
        <div className="DVBF">
            <Navbar></Navbar>
            <div className="DFBF">
                <MenuDireito />
                <div className="DIBF">
                    <div className="DFPBF">
                        <BackButton />
                        <h1 className="HMDBF">Contribuição recebida</h1>
                        <div className="DFFBF">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Lista de contribuidor - Fundos recebidos</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="IFBF"></img>
                                    <p >Filtro</p>
                                </div>
                                
                            </div>
                            
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                            <h1 style={{fontFamily: 'Inter'}}>Saldo disponivel: R$00,00</h1>
                            <div className="CDBF" >
                            

                                <div style={{ float: "left", flexWrap: "wrap", marginLeft: "0", marginRight: "0" }}>
                                    <div style={{ marginLeft: "2rem", marginTop: "1rem", fontSize: 18, fontFamily: "Inter", fontWeight: "bold" }}>Nome da Empresa</div>
                                    <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                        <img src="/icon_document.png" style={{ marginRight: "0.1rem", width: "1.3rem" }}></img>CNPJ/CPF: XXX.XXX.XXX-XX
                                    </div>
                                    <div style={{ marginLeft: "2rem", marginTop: "0.5rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                        <img src="/icon_tel.png" style={{ marginRight: "0.32rem", width: "1.1rem" }}></img>Contato: (00) 0 0000-0000
                                    </div>
                                </div>
                                
                                <div className="linha_vertical" style={{ backgroundColor: "black", height: "100%", width: "2px", marginLeft: "auto", marginRight: "0",}}></div>

                                <div>
                                <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                        Data da contribuição: 00/00/0000
                                    </div>
                                
                                    <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                    Valor recebido: R$ 00,00
                                    </div>
                                </div>
                               
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}