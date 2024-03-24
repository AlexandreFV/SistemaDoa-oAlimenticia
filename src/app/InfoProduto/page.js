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

export default function InfoProduto() {

    return (
        <div className="DivPai">
            <Navbar></Navbar>
            <div className="DivFilho">
                <MenuDireito />
                <div className="DivImagem">
                    <div className="DivFundoPai">
                        <BackButton />
                        <h1 className="h1MinDoa">Informações do Produto</h1>
                        <div className="DivFundoFilho">
                            <div className="nome_contact" style={{}}>
                                <p style={{ float: "left", marginTop: "3.5rem", marginLeft: "2.2rem", fontSize: "1.2rem", alignItems: "center", fontWeight: "bold" }}>&lt;Nome do Doador&gt;</p>
                                <div style={{ display: "grid", float: "right", marginTop: "1.8rem", marginRight: "2rem", border: "2px solid #7D9E65", borderRadius: "0.6rem", padding: "1rem" }}>
                                    <p style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}><b>Contato</b> <img style={{ width: "1.3rem", height: "1.3rem" }} src="/icon_tel.png"></img></p>
                                    <p className="telefone" style={{ fontSize: "1rem" }}>(00) 0 0000-0000</p>
                                </div>
                            </div>
                            <div className="Inf_product" style={{ display: "flex", clear: "both" }}>
                                <div style={{ float: "left" }}>
                                    <div style={{ marginLeft: "1.5rem", marginTop: "4.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Nome do Produto</p>
                                        <p style={{ fontSize: "1.1rem" }}>Maça</p>
                                    </div>
                                    <div style={{ marginLeft: "1.2rem", marginTop: "2.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Formato</p>
                                        <p style={{ fontSize: "1.1rem" }}>Caixa</p>
                                    </div>
                                    <div style={{ marginLeft: "1.2rem", marginTop: "2.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Formato</p>
                                        <p style={{ fontSize: "1.1rem" }}>Caixa</p>
                                    </div>
                                </div>
                                <div style={{ float: "left", marginLeft: "5rem" }}>
                                    <div style={{ marginTop: "4.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Categoria</p>
                                        <p style={{ fontSize: "1.1rem" }}>Fruta</p>
                                    </div>
                                    <div style={{ marginTop: "2.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Categoria</p>
                                        <p style={{ fontSize: "1.1rem" }}>Fruta</p>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "black", maxHeight: "100%", width: "2px", marginTop: "4.5rem", marginLeft: "3rem" }}></div>
                                <div>
                                    <div style={{ marginTop: "4.5rem", marginLeft: "1.5rem" }}><p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Descrição</p></div>
                                    <div>
                                        <p style={{ marginLeft: "1.5rem", overflowWrap: "break-word" }}>Este produto possui pequenas avarias na casca.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}