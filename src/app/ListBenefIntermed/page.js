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
import ProdutosDistribuidos from "./DistribuicaoProduto/page";

export default function ListProdutorIntermed() {

    const router = useRouter();
    const [produtosComprados, setProdutosComprados] = useState([]);
    const [idProd, setIdProd] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [nomeProduto, setNomeProd] = useState(null);

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
                const decodedToken = jwt.decode(token);
                const usuarioIntermediarioId = decodedToken.id;
                const response = await fetch(`http://localhost:3001/MeusProdutosComprados/${usuarioIntermediarioId}`, {
                    method: "GET",
                    headers: { 'Authorization': `Bearer ${token}` }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setProdutosComprados(data.produtosCompradosComImagem);
                }
            } catch (error) {
                console.log(error);
            }
        };
        handleExibir();
    }, []);


    const handleExibirBenef = async (idUser, idProd,nomeProduto) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/MeusIntermedios/${idUser}/${idProd}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
              
                    setIdProd(idProd);  
                    setIdUser(idUser);
                    setNomeProd(nomeProduto);
                    // router.push('/ProdutosBenef');
                

            } else {
                console.log("Tws");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        {idProd ? (
          <ProdutosDistribuidos idUser={idUser} idProd={idProd} nomeProduto={nomeProduto} />
        ) : (
        <div className="DPLISTBENE">
            <Navbar></Navbar>
            <div className="DFINFOPROD">
                <MenuDireito />
                <div className="DIINFOPROD">
                    <div className="DFPINFOPROD">
                        <BackButton />
                        <h1 className="h1MinDoaINFOPROD">Registro de Compras</h1>
                        <div className="DFFINFOPROD">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnvINFOPROD">Lista de Produtos Comprados</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="imgFiltrarINFOPROD"></img>
                                    <p >Filtro</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                            {produtosComprados.length === 0 ? (
                                <p>Não há produtos Disponiveis</p>
                            ) : (
                                <div>
                                    {produtosComprados.map((meusprodutos, index) => (
                                        <div key={index}>
                                            <div className="CardProduct" style={{ width: "90%", height: "9rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }} onClick={() => handleExibirBenef(meusprodutos.usuariointermediarioId, meusprodutos.id, meusprodutos.nome_alimento)}>

                                                <div style={{ float: "left", flexWrap: "wrap", marginLeft: "0", marginRight: "0" }}>
                                                    <div style={{ marginLeft: "2rem", marginTop: "1rem", fontSize: 18, fontFamily: "Inter", fontWeight: "bold" }}>{meusprodutos.usuariodoador.nome} </div>
                                                    <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                                        <img src="/icon_document.png" style={{ marginRight: "0.1rem", width: "1.3rem" }}></img>CNPJ/CPF: {meusprodutos.usuariodoador.cpf}
                                                    </div>
                                                    <div style={{ marginLeft: "2rem", marginTop: "0.5rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                                        <img src="/icon_tel.png" style={{ marginRight: "0.32rem", width: "1.1rem" }}></img>Contato:{meusprodutos.usuariodoador.telefone}
                                                    </div>
                                                </div>
                                                <div className="linha_vertical" style={{ backgroundColor: "black", height: "100%", width: "2px", marginLeft: "auto", marginRight: "0" }}></div>
                                                <div style={{ flexWrap: "wrap", marginLeft: "2rem", marginRight: "auto", marginTop: "1rem" }}>
                                                    <p style={{ fontFamily: "Inter" }}>Produto comprado: {meusprodutos.nome_alimento}</p>
                                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Categoria: {meusprodutos.categoria}</p>
                                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Formato: Caixa</p>
                                                    <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Quantidade: {meusprodutos.quantidade}</p>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textAlign: "right", marginRight: "5%" }}><b>Data de Compra:  {meusprodutos.createdAt && new Date(meusprodutos.createdAt).toLocaleDateString()}</b></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
    );
}
