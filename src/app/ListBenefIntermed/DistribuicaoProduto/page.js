"use client"

import Navbar from "../../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../../components/MenuIntermediario";
import { BackButtonDistribuirProd, CustomButton } from "../../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";

export default function DistribuicaoProduto({idUser, idProd,nomeProduto}) {

    const router = useRouter();
    const [intermedios, setIntermedios] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
         
        if(!token){

            router.push("/Cadastrar");
        }else {

        const userType = localStorage.getItem("userType");
        if(userType != "intermediario"){
            router.push("/PermissaoNegadaIntermediario");
        }
        } 
    })

    useEffect(() => {
        const handleExibir = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:3001/MeusIntermedios/${idUser}/${idProd}`, {
                    method: "GET",
                    headers: { 'Authorization': `Bearer ${token}` }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setIntermedios(data);
                    console.log(intermedios);
                }
            } catch (error) {
                console.log(error);
            }
        };
        handleExibir();
    }, []);


    return (
        <div className="DPLISTBENE">
            <Navbar></Navbar>
            <div className="DFINFOPROD">
                <MenuDireito />
                <div className="DIINFOPROD">
                    <div className="DFPINFOPROD">
                        <BackButtonDistribuirProd />
                        <h1 className="h1MinDoaINFOPROD">Lista de Distriuição do Produto</h1>
                        <div className="DFFINFOPROD">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnvINFOPROD">Distriuição do produto: {nomeProduto}</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="imgFiltrarINFOPROD"></img>
                                    <p >Filtro</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                            {intermedios.length === 0 ? (
                                <p>Não há produtos Disponiveis</p>
                            ) : (
                                <div>
                                    {intermedios.map((meusIntermedios, index) => (
                                        <div key={index}>
                                            <div className="CardProduct" style={{ width: "90%", height: "9rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>

                                                <div style={{ float: "left", flexWrap: "wrap", marginLeft: "0", marginRight: "0" }}>
                                                    <div style={{ marginLeft: "2rem", marginTop: "1rem", fontSize: 18, fontFamily: "Inter", fontWeight: "bold" }}>{meusIntermedios.usuariobeneficiario.nome} </div>
                                                    <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                                        <img src="/icon_document.png" style={{ marginRight: "0.1rem", width: "1.3rem" }}></img>CNPJ/CPF: {meusIntermedios.usuariobeneficiario.cpf}
                                                    </div>
                                                    <div style={{ marginLeft: "2rem", marginTop: "0.5rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                                        <img src="/icon_tel.png" style={{ marginRight: "0.32rem", width: "1.1rem" }}></img>Contato:{meusIntermedios.usuariobeneficiario.telefone}
                                                    </div>
                                                </div>
                                                <div className="linha_vertical" style={{ backgroundColor: "black", height: "100%", width: "2px", marginLeft: "auto", marginRight: "0" }}></div>
                                                <div style={{ flexWrap: "wrap", marginLeft: "2rem", marginRight: "auto", marginTop: "1rem" }}>
                                                    <p style={{ fontFamily: "Inter" }}>Produto comprado: {meusIntermedios.produtoComprado.nome_alimento}</p>
                                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Categoria: {meusIntermedios.produtoComprado.categoria}</p>
                                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Formato: Caixa</p>
                                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Quantidade: {meusIntermedios.quantidade}</p>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textAlign: "right", marginRight: "5%" }}><b>Data de doacao:  {meusIntermedios.createdAt && new Date(meusIntermedios.createdAt).toLocaleDateString()}</b></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
