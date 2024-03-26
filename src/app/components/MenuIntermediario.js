import React, { useState, useEffect } from 'react';
import CustomButton from "./customButton";
import "./MenuIntermediario.css";

export default function MenuIntermediario() {

    const [selectedButton, setSelectedButton] = useState(null);

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

    return (

        <div style={{ position: "relative", display: "inline-block", maxheight: "230px", maxwidth: "250px" }}>

            <div style={{
                paddingTop: "15px", color: "white", paddingLeft: "10px", backgroundColor: "#7D9E65",
                width: "250px", height: "130px", borderBottomRightRadius: "20px", borderTopRightRadius: "20px",
                marginTop: "40px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", zIndex: 2, position: "relative", display: "inline-block"
            }}>

                <img src="./Loign.png" width={"30px"} style={{ display: "inline-block" }} />
                <p style={{ display: "inline-block", marginLeft: "10px" }}>Olá, Intermediário!</p>

                <p style={{ paddingTop: "20px", textAlign: "center" }}>Espalhe esperança </p>
                <p style={{ textAlign: "center" }}>para quem precisa! </p>
            </div>

            <div style={{ color: "white", backgroundColor: "#FEFEFE", top: -15, width: "250px", height: "250px", borderBottomRightRadius: "20px", position: "relative", zIndex: 1 }}>

                <div style={{ paddingTop: "40px", }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/ColetarDoacao"} className={"btnn"} buttonText={"Coletar doação"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("ColetarDoacao")} />
                    </div>
                    <img id="arrow1" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("ColetarDoacao") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "16px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={""} className={"btnn"} buttonText={"Enviar produtos"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("EnviarProdutos")} />
                    </div>
                    <img id="arrow2" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("EnviarProdutos") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/ListProdutorIntermed"} className={"btnn"} buttonText={"Produtores"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("Produtores")} />
                    </div>
                    <img id="arrow3" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("Produtores") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/ListBenefIntermed"} className={"btnn"} buttonText={"Beneficiários"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("Beneficiarios")} />
                    </div>
                    <img id="arrow4" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("Beneficiarios") ? "visible" : "hidden" }}></img>
                </div>
            </div>
        </div>

    );
}
