"use client"
import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/MenuIntermediario";
import { BackButton, CustomButton } from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive, Fleur_De_Leah } from "next/font/google";

export default function ClassificacaoGeral() {

    // Estado para controlar qual botão está ativo
    const [activeButton, setActiveButton] = useState(1);
    const [classificacao, setClassificacao] = useState([]);
    // Função para lidar com o clique do botão
    const handleButtonClick = (button) => {
        // Se o botão clicado for o mesmo que já está ativo, retorna sem fazer nada
        if (button === activeButton) {
            return;
        }

        // Define o botão clicado como ativo
        setActiveButton(button);
    };

    // Efeito para definir o botão "Produtor" como ativo ao carregar a página
    useEffect(() => {
        setActiveButton(1); // Define o botão "Produtor" como ativo
    }, []);

    useEffect(() => {
        const ClassificacaoGeral = async () => {
            try{
                const response = await fetch(`http://localhost:3001/RankingTop6`, {
                    method: "GET",
                })

                if(response.ok){
                    const posicoes = await response.json();
                    setClassificacao(posicoes.topRanking);
                }

            }catch (error){
                console.log("Não foi possivel buscar as classificacacoes");
            }
        }; ClassificacaoGeral();
    }, [])

    return (
        <div className="ImgfundoClassGer">
            <div className="DivPClassGer">
                <Navbar />
                <div className="DivFClassGer">
                    <div className="TituloClassGer">
                        <p>Classificação geral</p>
                    </div>
                    <div className="DivNClassGer">
                        <div className="EscolhaClassUsu" >

                            <a href="#"
                                className={activeButton === 1 ? 'active btnDoador' : 'btnDoador'}
                                onClick={(e) => {
                                    e.preventDefault(); // Evita que o link seja seguido
                                    handleButtonClick(1);
                                }} >
                                <p className="textbtnProd">Produtor</p>
                            </a>
                            <a href="#"
                                className={activeButton === 2 ? 'active btnIntermed' : 'btnIntermed'}
                                onClick={(e) => {
                                    e.preventDefault(); // Evita que o link seja seguido
                                    handleButtonClick(2);
                                }}>
                                <p className="textbtnIntermed">Intermediário</p>
                            </a>

                        </div>
   
                        <div className="ConteudoProdutor" style={{ display: activeButton === 1 ? 'block' : 'none' }}>
                        {classificacao.length === 0 ? (
                            <div>
                            <img src="/triste.png" className="IT"></img>
                            <h1 className="HND">Ainda não há produtores.</h1>
                            <p className="PSP">Volte mais tarde.</p>
                            </div>
                            ) : (
                            <div>
                            <p style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", fontSize: "1.4rem", fontWeight: "bold" }}>Nível de doações</p>
                            <div style={{ display: "flex", justifyContent: "center" }} className="altarclass">
                                <div className="Segundolugar">               
                                    <div style={{}}>
                                        <center>
                                        <p style={{ marginTop: "1rem", fontFamily: "Rubik One", fontSize: "1.2rem" }}>{classificacao.length > 1 ? classificacao[1].usuariodoador.nome : "Não Ocupado"}</p>
                                            <img style={{ width: "3.2rem", height: "3.2rem" }} src="/medalha-de-prata.png" />
                                            <div style={{ backgroundColor: "#54B9BF", width: "4rem", height: "6.5rem", marginTop: "0.4rem", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}></div>
                                            <p>{classificacao.length > 1 ? classificacao[1].quantidade + "Vendas" : "0 Vendas"}</p>
                                        </center>
                                    </div>
                                </div>
                                <div className="Primeirolugar">
                                    <div style={{}}>
                                        <center>
                                            <p style={{ marginTop: "1rem", fontFamily: "Rubik One", fontSize: "1.2rem" }}>{classificacao.length > 0 ? classificacao[0].usuariodoador.nome : "Não Ocupado"}</p>
                                            <img style={{ width: "3.2rem", height: "3.2rem" }} src="/medalha-de-ouro.png" />
                                            <div style={{ backgroundColor: "#E3CA6F", width: "4rem", height: "6.5rem", marginTop: "0.4rem", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}></div>
                                            <p>{classificacao.length > 0 ? classificacao[0].quantidade + " Vendas" : "0 Vendas"}</p>
                                        </center>
                                    </div>
                                </div>
                                <div className="Terceirolugar">
                                    <div style={{}}>
                                        <center>
                                            <p style={{ marginTop: "1rem", fontFamily: "Rubik One", fontSize: "1.2rem" }}>{classificacao.length > 2 ? classificacao[2].usuariodoador.nome : "Não Ocupado"}</p>
                                            <img style={{ width: "3.2rem", height: "3.2rem" }} src="/medalha-de-bronze.png" />
                                            <div style={{ backgroundColor: "#76BF54", width: "4rem", height: "6.5rem", marginTop: "0.4rem", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}></div>
                                            <p>{classificacao.length > 2 ? classificacao[2].quantidade + " Vendas" : "0 Vendas"}</p>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontWeight: "bold" }} className="CardsProdutorsInferior">
                                <div className="CardProdutor">
                                    <div className="PosicaoDoador">
                                        <p>04º Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>{classificacao.length > 3 ? classificacao[3].usuariodoador.nome : "Não Ocupado"}</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Vendas</p>
                                            <p>{classificacao.length > 3 ? classificacao[3].quantidade : "0"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="CardProdutor">
                                    <div className="PosicaoDoador">
                                        <p>05º Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>{classificacao.length > 4 ? classificacao[4].usuariodoador.nome : "Não Ocupado"}</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Vendas</p>
                                            <p>{classificacao.length > 4 ? classificacao[4].quantidade : "0"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="CardProdutor">
                                    <div className="PosicaoDoador">
                                        <p>06º Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>{classificacao.length > 5 ? classificacao[5].usuariodoador.nome : "Não Ocupado"}</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Vendas</p>
                                            <p>{classificacao.length > 5 ? classificacao[5].quantidade : "0"}</p>
                                        </div>

                                    </div>
                                </div>
                               
                            </div>
                            </div>
                            )};
                        </div>
                    
                        <div className="ConteudoIntermed" style={{ display: activeButton === 2 ? 'block' : 'none' }}>
                            <p style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", fontSize: "1.4rem", fontWeight: "bold" }}>Nível de doações</p>
                            <div style={{ display: "flex", justifyContent: "center" }} className="altarclass">
                                <div className="Segundolugar">
                                    <div style={{}}>
                                        <center>
                                            <p style={{ marginTop: "1rem", fontFamily: "Rubik One", fontSize: "1.2rem" }}>-Nome do Intermediário-</p>
                                            <img style={{ width: "3.2rem", height: "3.2rem" }} src="/medalha-de-prata.png" />
                                            <div style={{ backgroundColor: "#54B9BF", width: "4rem", height: "6.5rem", marginTop: "0.4rem", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}></div>
                                            <p>7.000 pontos</p>
                                            <p>70 doações</p>
                                        </center>
                                    </div>
                                </div>
                                <div className="Primeirolugar">
                                    <div style={{}}>
                                        <center>
                                            <p style={{ marginTop: "1rem", fontFamily: "Rubik One", fontSize: "1.2rem" }}>-Nome do Intermediário-</p>
                                            <img style={{ width: "3.2rem", height: "3.2rem" }} src="/medalha-de-ouro.png" />
                                            <div style={{ backgroundColor: "#E3CA6F", width: "4rem", height: "6.5rem", marginTop: "0.4rem", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}></div>
                                            <p>10.000 pontos</p>
                                            <p>100 doações</p>
                                        </center>
                                    </div>
                                </div>
                                <div className="Terceirolugar">
                                    <div style={{}}>
                                        <center>
                                            <p style={{ marginTop: "1rem", fontFamily: "Rubik One", fontSize: "1.2rem" }}>-Nome do Intermediário-</p>
                                            <img style={{ width: "3.2rem", height: "3.2rem" }} src="/medalha-de-bronze.png" />
                                            <div style={{ backgroundColor: "#76BF54", width: "4rem", height: "6.5rem", marginTop: "0.4rem", boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}></div>
                                            <p>6.000 pontos</p>
                                            <p>60 doações</p>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontWeight: "bold" }} className="CardsIntermedsInferior">
                                <div className="CardIntermed">
                                    <div className="PosicaoIntermed">
                                        <p>04º Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>-Nome do Intermediário-</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Doação</p>
                                            <p>40</p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Pontos</p>
                                            <p>4.000</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="CardIntermed">
                                    <div className="PosicaoIntermed">
                                        <p>05º Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>-Nome do Intermediário-</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Doação</p>
                                            <p>35</p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Pontos</p>
                                            <p>3.500</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="CardIntermed">
                                    <div className="PosicaoIntermed">
                                        <p>06º Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>-Nome do Intermediário-</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Doação</p>
                                            <p>28</p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Pontos</p>
                                            <p>2.800</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="CardIntermed">
                                    <div className="PosicaoIntermed">
                                        <p>XXº Lugar</p>
                                    </div>
                                    <div style={{ backgroundColor: "black", width: "2px", height: "100%", marginLeft: "2rem" }}></div>
                                    <div>
                                        <p style={{ marginLeft: "2rem" }}>-Nome do Intermediário-</p>
                                    </div>
                                    <div style={{ display: "flex", marginLeft: "auto" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Doação</p>
                                            <p>40</p>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem" }}>
                                            <p>Pontos</p>
                                            <p>4.000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                </div>
            </div>
        </div>

    );

}