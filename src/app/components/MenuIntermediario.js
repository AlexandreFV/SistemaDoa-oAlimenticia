import React, { useState, useEffect } from 'react';
import CustomButton from "./customButton";
import "./MenuIntermediario.css";

export default function MenuIntermediario() {

    const [selectedButton, setSelectedButton] = useState(null);
    const [imageVisible, setImageVisible] = useState(false); // Estado para controlar a visibilidade da imagem

    const handleButtonClick = (button) => {
        setSelectedButton(button);
        setImageVisible(true); // Ao clicar em um botão, definimos a visibilidade da imagem como verdadeira
    };

    useEffect(() => {
        const storedImageVisible = localStorage.getItem('imageVisible');
        console.log('storedImageVisible:', storedImageVisible);
        if (storedImageVisible) {
            setImageVisible(JSON.parse(storedImageVisible));
        }
    }, []);

    useEffect(() => {
        console.log('imageVisible:', imageVisible);
        localStorage.setItem('imageVisible', JSON.stringify(imageVisible));
    }, [imageVisible]);

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
                    <img id="arrow1" src="/SetaDireita.png" style={{ visibility: selectedButton === "ColetarDoacao" && imageVisible ? "visible" : "hidden", marginTop: "4px" }}></img>
                </div>

                <div style={{ paddingTop: "16px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={""} className={"btnn"} buttonText={"Enviar produtos"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("EnviarProdutos")} />
                    </div>
                    <img id="arrow2" src="/SetaDireita.png" style={{ visibility: selectedButton === "EnviarProdutos" && imageVisible ? "visible" : "hidden", marginTop: "4px" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/ListProdutorIntermed"} className={"btnn"} buttonText={"Produtores"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("Produtores")} />
                    </div>
                    <img id="arrow3" src="/SetaDireita.png" style={{ visibility: selectedButton === "Produtores" && imageVisible ? "visible" : "hidden", marginTop: "4px" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/ListBenefIntermed"} className={"btnn"} buttonText={"Beneficiários"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("Beneficiarios")} />
                    </div>
                    <img id="arrow4" src="/SetaDireita.png" style={{ visibility: selectedButton === "Beneficiarios" && imageVisible ? "visible" : "hidden", marginTop: "4px" }}></img>
                </div>
            </div>
        </div>

    );
}
