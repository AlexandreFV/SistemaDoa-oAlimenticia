"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/MenuEmpresa";
import { BackButton, CustomButton } from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";

export default function ContribFinanceiraEmpresa() {
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
         
        if(!token){

            router.push("/Cadastrar");
        }else {

        const userType = localStorage.getItem("userType");
        if(userType != "empresa"){
            router.push("/PermissaoNegadaIntermediario");
        }
        } 
    })
    return (
        <div className="DVBF">
            <Navbar></Navbar>
            <div className="DFBF">
                <MenuDireito />
                <div className="DIBF">
                    <div className="DFPBF">
                        <BackButton />
                        <h1 className="HMDBF">Contribuição Financeira</h1>
                        <div className="DFFBF">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Intermediários Ativos</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="IFBF"></img>
                                    <p >Filtro</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                            <div className="CDBF" >

                                <div style={{ float: "left", flexWrap: "wrap", marginLeft: "0", marginRight: "0" }}>
                                    <div style={{ marginLeft: "2rem", marginTop: "1rem", fontSize: 18, fontFamily: "Inter", fontWeight: "bold" }}>Nome do Intermediário</div>
                                    <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                        <img src="/icon_document.png" style={{ marginRight: "0.1rem", width: "1.3rem" }}></img>CNPJ/CPF: XXX.XXX.XXX-XX
                                    </div>
                                    <div style={{ marginLeft: "2rem", marginTop: "0.5rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                        <img src="/icon_tel.png" style={{ marginRight: "0.32rem", width: "1.1rem" }}></img>Contato: (00) 0 0000-0000
                                    </div>
                                </div>
                                <div className="linha_vertical" style={{ backgroundColor: "black", height: "100%", width: "2px", marginLeft: "auto", marginRight: "0" }}></div>
                                <div style={{ marginLeft: "2rem", marginRight: "auto", marginTop: "1rem" }}>
                                <img src="/pin-de-localizacao 1.png" style={{ fontFamily: "Inter", marginTop: "0.4rem", float: "left", marginTop: "12px" }}></img>
                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem", display: "flex", alignItems: "center", flexDirection: "row", width: "220px", maxWidth: "220px" }}>Localização: CEP 03318000, Rua Serra de Bragança,Vila Gomes Cardim, 130 - São Paulo, SP</p>
                                </div>
                                
                            </div>
                            <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textAlign: "right", marginRight: "5%" }}><b>Última Contribuição: 00/00/0000</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}