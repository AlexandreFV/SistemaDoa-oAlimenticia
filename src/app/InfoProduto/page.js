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
import { loadStripe } from '@stripe/stripe-js';

export default function InfoProduto() {
    const router = useRouter();
    const [doacao, setDoacao] = useState(null); // Correção: Mudei "doacoes" para "doacao" para corresponder ao estado único    
    const [comprando, setComprando] = useState(false);
    const stripePromise = loadStripe('pk_test_51PCbkzB0I0kVCHBEihpetEBp7kXq1YVpTKrS6bXZYxRlH354snfCHDaGO4C4hV792xqpN0KeDmOmnSJsOZOLcZdw00oLulsgGR'); // Substitua pelo seu publishable key

    
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          router.push('/Cadastrar');
        } else {
          const UserType = localStorage.getItem('userType');
          if (UserType !== 'intermediario') {
            router.push("/PermissaoNegadaIntermediario");
          }
        }
      }, []);

    useEffect(() => {
        const fetchDoacoes = async () => {
          try {
            const token = localStorage.getItem('token');
            const idFromURL = window.location.search.match(/id=(\d+)/)[1];

            const response = await fetch(`http://localhost:3001/InfoProduto/${idFromURL}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              setDoacao(data);
                } else {
              console.error('Erro ao buscar doações:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao buscar doações:', error.message);
          }finally {
            setComprando(false); // Após a conclusão da compra (seja bem-sucedida ou não), atualiza o estado para indicar que a compra foi concluída
        }
        };
    
        fetchDoacoes();
    }, []);

    const handleConfirmarCompra = async (id) => {
          try{
            setComprando(true); // Atualiza o estado para indicar que está comprando

            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3001/ComprarProdutoSEMPAGAR/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Compra confirmada!');
                router.push("/ColetarDoacao");

            } else {
                // Exibir mensagem de erro
                console.error('Erro ao confirmar compra:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao confirmar compra:', error.message);
        }
    };

    const handleClickStripe = async (idProd, idVendedor) => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const usuarioCompradorId = decodedToken.id;
    
            const response = await fetch(`http://localhost:3001/ComprarProduto/${idProd}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomeProd: doacao.nome_alimento,
                    quant: doacao.quantidade,
                    descricao: doacao.descricao,
                    usuarioCompradorId: usuarioCompradorId,
                    usuarioVendedorId: idVendedor,
                    precoTotal: doacao.preco,
                }),
            });
    
            if (response.ok) {
                const { sessionId } = await response.json();
                const stripe = await stripePromise;
                await stripe.redirectToCheckout({ sessionId });
            } else {
                console.error('Erro ao criar sessão de checkout:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao criar sessão de checkout:', error.message);
        }
    };
    


    return (
        <div className="DPINFOPROD">
            <Navbar></Navbar>
            <div className="DFINFOPROD">
                <MenuDireito />

                <div className="DIINFOPROD">
                    <div className="DFPINFOPROD">
                        <BackButton />
                        <h1 className="h1MinDoaINFOPROD">Informações do Produto</h1>
                        <div className="DFFINFOPROD">

                            <div className="nome_contact" >
                                <p style={{ float: "left", marginTop: "3.5rem", marginLeft: "2.2rem", fontSize: "1.2rem", alignItems: "center", fontWeight: "bold" }}>{doacao && doacao.usuariodoador.nome}</p>
                                <div style={{ display: "grid", float: "right", marginTop: "1.8rem", marginRight: "2rem", border: "2px solid #7D9E65", borderRadius: "0.6rem", padding: "1rem" }}>
                                    <p style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}><b>Contato</b> <img style={{ width: "1.3rem", height: "1.3rem" }} src="/icon_tel.png"></img></p>
                                    <p className="telefone" style={{ fontSize: "1rem" }}>{doacao && doacao.usuariodoador.telefone}</p>
                                </div>
                            </div>
                            <div className="Inf_product" style={{ display: "flex", clear: "both" }}>
                                <div style={{ float: "left" }}>
                                    <div style={{ marginLeft: "1.5rem", marginTop: "4.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Nome do Produto</p>
                                        <p style={{ fontSize: "1.1rem" }}>{doacao && doacao.nome_alimento}</p>

                                    </div>
                                    <div style={{ marginLeft: "1.2rem", marginTop: "2.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Formato</p>
                                            <p style={{ fontSize: "1.1rem" }}>{doacao && doacao.formato}</p>
                                    </div>
                                    <div style={{ marginLeft: "1.2rem", marginTop: "2.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Validade</p>
                                        <p style={{ fontSize: "1.1rem" }}>{doacao && doacao.validade && new Date(doacao.validade).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div style={{ float: "left", marginLeft: "5rem" }}>
                                    <div style={{ marginTop: "4.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Categoria</p>
                                        <p style={{ fontSize: "1.1rem" }}>{doacao && doacao.categoria}</p>
                                    </div>
                                    <div style={{ marginTop: "2.5rem" }}>
                                        <p style={{ alignItems: "center", fontSize: "1.1rem", fontWeight: "bold" }}>Quantidade</p>
                                        <p style={{ fontSize: "1.1rem" }}>{doacao && doacao.quantidade}</p>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "black", maxHeight: "100%", width: "2px", marginTop: "4.5rem", marginLeft: "3rem" }}></div>
                                <div>
                                    <div style={{ marginTop: "4.5rem", marginLeft: "1.5rem" }}><p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Descrição</p></div>
                                    <div>
                                        <p style={{ marginLeft: "1.5rem", overflowWrap: "break-word" }}>{doacao && doacao.descricao}</p>
                                    </div>
                                    <div style={{ marginTop: "4.5rem", marginLeft: "1.5rem" }}><p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Preço Total</p></div>
                                    <p style={{ marginLeft: "1.5rem", overflowWrap: "break-word" }}>{doacao && doacao.preco}</p>
                                    <button onClick={() => handleClickStripe(doacao.id, doacao.usuariodoador.id)}>Pagar com Stripe</button>
                                    <button 
                className="btn btn-success" 
                style={{ position: "absolute", marginLeft: "150px", marginTop: "100px" }}
                onClick={() => handleConfirmarCompra(doacao.id)}
                disabled={comprando} // Desativa o botão enquanto a compra está em andamento
            >
                {comprando ? 'Comprando...' : 'Confirmar Compra'}
            </button>     </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}