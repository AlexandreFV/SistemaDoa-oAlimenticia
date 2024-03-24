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

export default function ColetarDoacao() {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (

        <div className="DivPai">
            <Navbar></Navbar>
            <div className="DivFilho">
                <MenuDireito />
                <div className="DivImagem">
                    <div className="DivFundoPai">
                        <BackButton />
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
                            <div className="CardProduct" style={{ width: "90%", height: "6.4rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto" }}>
                                <div style={{ float: "left" }}>
                                    <img style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px" }} src="/imgMaca.jpg"></img>
                                </div>
                                <div style={{ float: "left" }}>
                                    <div style={{ marginLeft: "1rem", paddingTop: "0.7rem", fontSize: 19, fontFamily: "Inter", fontWeight: "bold" }}>Nome do doador</div>
                                    <div style={{ marginLeft: "1rem", marginTop: "1rem", fontSize: 19, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}><b>Produto:</b> Maçã</div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", textAlign: "center", flexWrap: "wrap" }}>
                                    <div style={{ paddingTop: "1.5rem", flex: "1", marginRight: "-5rem", marginLeft: "-10%" }}>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold' }}>Categoria</div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>Nome</div>
                                    </div>
                                    <div style={{ paddingTop: "1.5rem", flex: "1", marginRight: "-5rem" }}>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold' }}>Formato</div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>Caixa</div>
                                    </div>
                                    <div style={{ paddingTop: "1.5rem", flex: "1" }}>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold' }}>Quantidade</div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>20</div>
                                    </div>
                                    <div style={{ marginLeft: "auto", marginTop: "2.5rem", marginRight: "1.5rem" }}>
                                        <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                                            <input
                                                type="checkbox"
                                                id="checkbox"
                                                className="checkbox-input"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor="checkbox" className="checkbox-label">
                                                {isChecked && <img src={"/iconcerto.png"} alt="Checked" className="checkbox-icon" />}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', marginLeft: "5%", float: "left" }}><b>Contato:</b> (00) 0 0000-0000</div>
                            <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textAlign: "right", marginRight: "5%" }}><b>Validade:</b> 00/00/0000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
/*

*/
/*


<div style={{width: 94, height: 51.29, left: 280.83, top: 11.30, position: 'absolute'}}>

</div>
<div style={{width: 80, height: 51.29, left: 411.05, top: 11.45, position: 'absolute'}}>

</div>
<div style={{width: 112, height: 50.37, left: 527.28, top: 11.30, position: 'absolute'}}>
<div style={{left: 44.40, top: 27.37, position: 'absolute', color: 'black', fontSize: 19, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>20</div>
<div style={{left: 0, top: 0, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word'}}>Quantidade</div>
</div>
*/