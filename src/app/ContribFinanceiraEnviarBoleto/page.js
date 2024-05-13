"use client"
import Navbar from "../components/layoutCadastroLogin";
import Menu from "../components/MenuEmpresa";
import styles from "./style.css";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BackButton, CustomButton } from "../components/customButton";
import Link from "next/link";
import SucErroAddDoacao from "../components/SucErroAddDoacao";

export default function ContribFinanceiraEnviarBoleto() {


    return (

        <div className="DivPaiEnviarBoleto">
            <Navbar />
            <div className="DivFilhoEnviarBoleto">
                <Menu />

                <div className="DivImagemEnviarBoleto">
                    <div className="DivFundoPaiEnviarBoleto">

                        <BackButton />

                        <h1 className="tituloEnviarBoleto">Contribuição Financeira</h1>
                        <div className="DivFundoFilhoEnviarBoleto">

                            <div className="posfundoFilhoEnviarBoleto" >
                                <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }} className="h1EnviarBoleto">Confirmação de envio</h1>

                                </div>
                                <div style={{ backgroundColor: "black", height: "2px", width: "100%" }}></div>


                                <div className="containtInternoEnviarBoleto">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.8rem", fontSize: "1.3rem", fontWeight: "" }}>Código gerado com sucesso!</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", marginBottom: "1.8rem", float: "left" }}>Nome do Intermediário à receber: <b style={{ fontSize: "1.1rem" }}>-Nome do Intermediário- </b></p>
                                    </div>
                                    <div style={{ width: "85%", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "5rem" }}>

                                        <div style={{}}>
                                            <p style={{ fontSize: "1.1rem" }}>Valor a ser pago:</p>
                                            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>R$ 100,00</p>
                                        </div>
                                        <div style={{}}>
                                            <p style={{ fontSize: "1.1rem" }}>Validade:</p>
                                            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>00/00/0000</p>
                                        </div>

                                    </div>
                                    <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <p style={{ fontSize: "0.9rem", fontWeight: "bold", textAlign: "center" }}>Escanei este código de Barras e pague o boleto pelo seu aplicativo bancário.</p>
                                        <img style={{ width: "30rem" }} src="/Icon_CodeBarBig.png"></img>
                                        <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>XXXXX.XXXXX XXXXX.XXXXXX XXXXX.XXXXXX X XXXXXXXXXXXXXX</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", gap: "3rem" }}>
                                        <button className="btnCopiaCod" type='submit'>Copiar código <img src="/icon_CopiaCola.png" style={{ width: "1rem", marginLeft: "0.5rem" }}></img></button>
                                        <button className="btnVerBoleto" type='submit'>Ver boleto <img src="/Icon_Boletopdf.png" style={{ width: "1.2rem", marginLeft: "0.5rem" }}></img></button>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}>
                                        <p>Observação: O pagamento deverá ser realizado no prazo de 01 semana.</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
};