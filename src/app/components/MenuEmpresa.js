import CustomButton from "./customButton";
import "./MenuEmpresa.css";
import { useState, useEffect } from "react";

export default function MenuEmpresa() {

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
                width: "280px", height: "130px", borderBottomRightRadius: "20px", borderTopRightRadius: "20px",
                marginTop: "40px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", zIndex: 2, position: "relative", display: "inline-block"
            }}>

                <img src="./Loign.png" width={"30px"} style={{ display: "inline-block" }} />
                <p style={{ display: "inline-block", marginLeft: "10px" }}>Olá, Contribuinte!</p>

                <p style={{ paddingTop: "20px", textAlign: "center" }}>Uma rede solidária se </p>
                <p style={{ textAlign: "center" }}>fortalece com sua empresa!</p>
            </div>

            <div style={{ color: "white", backgroundColor: "#FEFEFE", top: -15, width: "280px", height: "250px", borderBottomRightRadius: "20px", position: "relative", zIndex: 1 }}>

                <div style={{ paddingTop: "40px", }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/ContribFinanceiraEmpresa"} className={"btnn"} buttonText={"Contribuição Financeira"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("ContribuicaoFinanceira")} />
                    </div>
                    <img id="arrow1" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("ContribuicaoFinanceira") ? "visible" : "hidden" }}></img>
                </div>

                <div style={{ paddingTop: "16px" }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/HistoricoContribuicao"} className={"btnn"} buttonText={"Histórico de Contribuição"} textStyle={{ marginLeft: "1rem" }} onClick={() => handleButtonClick("HistoricoContribuicao")} />
                    </div>
                    <img id="arrow2" src="/SetaDireita.png" style={{ marginTop: "4px", visibility: shouldShowImage("HistoricoContribuicao") ? "visible" : "hidden" }}></img>
                </div>
            </div>
        </div>

    );
}