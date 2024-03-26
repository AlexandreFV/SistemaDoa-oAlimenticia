"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/MenuBeneficiario";
import { BackButton, CustomButton } from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";

export default function ListProdutorIntermed() {

    return (
        <div className="DivPai">
            <Navbar></Navbar>
            <div className="DivFilho">
                <MenuDireito />
                <div className="DivImagem">
                    <div className="DivFundoPai">
                        <BackButton />
                        <h1 className="h1MinDoa">Instituição doadora</h1>
                        <div className="DivFundoFilho">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Intermediário(s) doadore(s)</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="imgFiltrar"></img>
                                    <p >Filtro</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                            <div className="CardProduct" style={{ width: "90%", height: "9rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>

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
                                <div style={{ flexWrap: "wrap", marginLeft: "2rem", marginRight: "auto", marginTop: "1rem" }}>
                                    <p style={{ fontFamily: "Inter" }}>Produto doado: Maçã</p>
                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Categoria: Fruta</p>
                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Quantidade: 10</p>
                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Data de doação: 10/10/2024</p>
                                </div>
                            </div>
                            <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textAlign: "right", marginRight: "5%" }}><b>Prazo máximo de entrega: 7 dias</b></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}