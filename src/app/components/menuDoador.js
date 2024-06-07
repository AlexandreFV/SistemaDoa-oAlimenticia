
"use client"
import { useEffect, useState } from "react";
import CustomButton from "./customButton"
import './menuDoador.css';
import ModalIntegracao from "./modalIntegracao";
import jwt from 'jsonwebtoken';

export default function menuDoador() {

    const [selectedButton, setSelectedButton] = useState(null);
    const [linkIntegracao, setLinkIntegracao] = useState("");
    const [NIntegrado, setNIntegrado] = useState(false);

    // Função para lidar com o clique no botão
    const handleButtonClick = (button) => {
        setSelectedButton(button);
        localStorage.setItem('selectedButton', button); // Armazenar o botão selecionado no armazenamento local
    };

    // Função para verificar se a imagem deve ser mostrada com base no botão selecionado
    const shouldShowImage = (button) => {
        return selectedButton === button;
    };

    useEffect(() => {
        // Recuperar o botão selecionado do armazenamento local ao montar o componente
        const storedButton = localStorage.getItem('selectedButton');
        if (storedButton) {
            setSelectedButton(storedButton);
        }
    }, []); // Executar apenas uma vez ao montar o componente

    useEffect(() => {
        const verificarIntegracao = async () => {
            const userIdStripe = localStorage.getItem("IdStripe");
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            try {
                const response = await fetch(`http://localhost:3001/VerificarIntegracao/${userIdStripe}`, {
                    'Authorization': `Bearer ${token}`
                })
                if (response.ok) {
                    const data = await response.json();
                    if (data.loginLink) {
                        setLinkIntegracao(data.loginLink.url);
                        setNIntegrado(true);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar integracao:', error.message);
            }
        }; verificarIntegracao();
    }, []);

    return (


        <div style={{ position: "relative", display: "inline-block", maxheight: "230px", maxwidth: "250px" }}>

            <div style={{
                paddingTop: "15px", color: "white", paddingLeft: "10px", backgroundColor: "#7D9E65",
                width: "250px", height: "130px", borderBottomRightRadius: "20px", borderTopRightRadius: "20px",
                marginTop: "40px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", zIndex: 2, position: "relative", display: "inline-block"
            }}>

                <img src="./Loign.png" width={"30px"} style={{ display: "inline-block" }} />
                <p style={{ display: "inline-block", marginLeft: "10px" }}>Olá, Doador!</p>

                <p style={{ paddingTop: "20px", textAlign: "center" }}>Faça a diferença! </p>
                <p style={{ textAlign: "center" }}>Doe e transforme vidas. </p>
            </div>

            <div style={{
                color: "white", backgroundColor: "#FEFEFE", top: -15,
                width: "250px", height: "250px", borderBottomRightRadius: "20px",
                position: "relative", zIndex: 1
            }}>

                <div style={{ paddingTop: "40px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton rel="preload" href={"/facaDoacao"} className={"btnn"} buttonText={"Fazer Doação"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("facaDoacao")} />
                    </div>
                    <img id="arrow1" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("facaDoacao") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton rel="preload" href={"/MinhasDoacoes"} className={"btnn"} buttonText={"Meus Produtos à Venda"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("MinhasDoacoes")} />
                    </div>
                    <img id="arrow2" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("MinhasDoacoes") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton rel="preload" href={"/MeusProdutosVendidos"} className={"btnn"} buttonText={"Meus Produtos vendidos"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("MeusProdutosVendidos")} />
                    </div>
                    <img id="arrow3" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("MeusProdutosVendidos") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton rel="preload" href={"/MinhaClassificacaoDoador"} className={"btnn"} buttonText={"Nível de classificação"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("MinhaClassificacaoDoador")} />
                    </div>
                    <img id="arrow4" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("MinhaClassificacaoDoador") ? "visible" : "hidden" }}></img>
                </div>
            </div>
        </div>
    )
}