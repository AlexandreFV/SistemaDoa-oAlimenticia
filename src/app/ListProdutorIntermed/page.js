    "use client"

    import Navbar from "../components/layoutCadastroLogin";
    import "./style.css";
    import MenuDireito from "../components/MenuIntermediario";
    import { BackButton, CustomButton } from "../components/customButton";
    import { useEffect, useState } from 'react';
    import Link from 'next/link';
    import { useRouter } from "next/navigation";
    import jwt, { decode } from 'jsonwebtoken';
    import { Cedarville_Cursive } from "next/font/google";

    export default function ListProdutorIntermed() {
        const [intermedio, setIntermedio] = useState([]);
        const router = useRouter();

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
            const handleExibir = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:3001/ListProdutorIntermed`, {
                        method: "GET",
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setIntermedio(data.meusIntermedios);
                        console.log("teste");

                    } else {
                        console.log("Tws");
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            handleExibir();
        }, []);
        
        return (
            <div className="DivPai">
                <Navbar></Navbar>
                <div className="DivFilho">
                    <MenuDireito />
                    <div className="DivImagem">
                        <div className="DivFundoPai">
                            <BackButton />
                            <h1 className="h1MinDoa">Produtores</h1>
                            <div className="DivFundoFilho">
                                <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Lista de Produtores - Produtos coletados</h1>
                                    <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                        <img src="./filtrar.png" className="imgFiltrar"></img>
                                        <p >Filtro</p>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                                {intermedio && intermedio.length > 0 && intermedio.map((meuIntermedio, index) => (
                                <div>
                                <div key={index} className="CardProduct" style={{ width: "90%", height: "9rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "2rem", marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center" }}>

                                    <div style={{ float: "left", flexWrap: "wrap", marginLeft: "0", marginRight: "0" }}>
                                        <div style={{ marginLeft: "2rem", marginTop: "1rem", fontSize: 18, fontFamily: "Inter", fontWeight: "bold" }}>{meuIntermedio.usuariodoador.nome}</div>
                                        <div style={{ marginLeft: "2rem", marginTop: "1.2rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                            <img src="/icon_document.png" style={{ marginRight: "0.1rem", width: "1.3rem" }}></img>CNPJ/CPF: {meuIntermedio.usuariodoador.cpf}
                                        </div>
                                        <div style={{ marginLeft: "2rem", marginTop: "0.5rem", fontSize: "1rem", fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word', display: "flex", alignItems: "center" }}>
                                            <img src="/icon_tel.png" style={{ marginRight: "0.32rem", width: "1.1rem" }}></img>Contato: {meuIntermedio.usuariodoador.telefone}
                                        </div>
                                    </div>
                                    <div className="linha_vertical" style={{ backgroundColor: "black", height: "100%", width: "2px", marginLeft: "auto", marginRight: "0" }}></div>
                                    <div style={{ flexWrap: "wrap", marginLeft: "2rem", marginRight: "auto", marginTop: "1rem" }}>
                                        <p style={{ fontFamily: "Inter" }}>Produto coletado: {meuIntermedio.nome_alimento}</p>
                                        <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Categoria: {meuIntermedio.categoria}</p>
                                        <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Formato: Caixa</p>
                                        <p style={{ fontFamily: "Inter", marginTop: "0.4rem" }}>Quantidade: {meuIntermedio.quantidade}</p>
                                    </div>
                                </div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500', textAlign: "right", marginRight: "5%" }}><b>Data de validade: </b>{meuIntermedio && meuIntermedio.validade && new Date(meuIntermedio.validade).toLocaleDateString()}</div>
                                        </div>

                                    ))}

                                </div>
                                
                        </div>
                    </div>
                </div>
            </div>
        );
    }