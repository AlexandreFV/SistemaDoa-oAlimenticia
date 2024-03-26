import React, { useState, useEffect } from 'react';
import CustomButton from "./customButton";
import "./MenuBeneficiario.css";

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
                <p style={{ display: "inline-block", marginLeft: "10px" }}>Olá, Beneficiário!</p>

                <p style={{ paddingTop: "20px", textAlign: "center" }}>Torne suas necessidades </p>
                <p style={{ textAlign: "center" }}>em realidade! </p>
            </div>

            <div style={{ color: "white", backgroundColor: "#FEFEFE", top: -15, width: "250px", height: "250px", borderBottomRightRadius: "20px", position: "relative", zIndex: 1 }}>

                <div style={{ paddingTop: "40px", }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={""} className={"btnn"} buttonText={"Instituição doadora"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("Beneficiario")} />
                    </div>
                    <img id="arrow1" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("Beneficiario") ? "visible" : "hidden" }}></img>
                </div>
            </div>
        </div>
    );
}
