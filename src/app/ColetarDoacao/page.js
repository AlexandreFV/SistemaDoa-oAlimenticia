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

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}