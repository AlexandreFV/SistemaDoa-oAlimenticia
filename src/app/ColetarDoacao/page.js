"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/MenuIntermediario";
import CustomButton from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';

export default function ColetarDoacao() {

    return (
        <div className="DivPai">
            <Navbar></Navbar>
            <div className="DivFilho">
                <MenuDireito />
                <div className="DivImagem">
                    <div className="DivFundoPai">
                        <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco"></img>
                        <h1 className="h1MinDoa">Coletar Doação</h1>
                        <div className="DivFundoFilho">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Doações disponíveis</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="imgFiltrar"></img>
                                    <p >Filtro</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>

                            <div className="CardProduct" style={{ width: "90%", height: "6.3rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto" }}>
                                <div><img style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }} src="/imgMaca.jpg"></img></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}