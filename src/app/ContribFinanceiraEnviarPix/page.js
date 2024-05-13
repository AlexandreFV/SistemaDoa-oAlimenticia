"use client"
import Navbar from "../components/layoutCadastroLogin";
import Menu from "../components/MenuEmpresa";
import styles from "./style.css";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BackButton, CustomButton } from "../components/customButton";
import Link from "next/link";
import SucErroAddDoacao from "../components/SucErroAddDoacao";

export default function ContribFinanceiraEnviarPix() {

    // Estado para armazenar o código do Pix
    const [pixCode, setPixCode] = useState('');

    // Função para gerar um código de Pix aleatório
    const generatePixCode = () => {
        // Aqui você pode implementar a lógica para gerar o código de Pix
        // Neste exemplo, estou apenas gerando um número aleatório
        const randomCode = Math.floor(Math.random() * 100000000000).toString();
        setPixCode(randomCode);
    };


    return (

        <div className="DivPaiEnviarPix">
            <Navbar />
            <div className="DivFilhoEnviarPix">
                <Menu />

                <div className="DivImagemEnviarPix">
                    <div className="DivFundoPaiEnviarPix">

                        <BackButton />

                        <h1 className="tituloEnviarPix">Contribuição Financeira</h1>
                        <div className="DivFundoFilhoEnviarPix">

                            <div className="posfundoFilhoEnviarPix" >
                                <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }} className="h1EnviarPix">Confirmação de envio</h1>

                                </div>
                                <div style={{ backgroundColor: "black", height: "2px", width: "100%" }}></div>


                                <div className="containtInterno">
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.8rem", fontSize: "1.3rem", fontWeight: "" }}>Código gerado com sucesso!</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", marginBottom: "1.8rem", float: "left" }}>Nome do Intermediário à receber: <b style={{ fontSize: "1.1rem" }}>-Nome do Intermediário- </b></p>
                                    </div>
                                    <div style={{ width: "85%", margin: "0 auto", display: "flex", flexWrap: "wrap" }}>
                                        <div style={{ marginRight: "1rem" }}>
                                            <img src="/icon_bancoPix.png" style={{ width: "15rem" }}></img>
                                            <p style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>Valor a ser pago</p>
                                            <div style={{
                                                border: "2px solid #00000061", width: "7rem", height: "2.5rem", display: "flex", alignItems: "center",
                                                justifyContent: "center", borderRadius: "5px", marginTop: "0.3rem", margin: "0 auto"
                                            }}>
                                                <p style={{ display: "flex", justifyContent: "center" }}>R$ 100,00</p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", marginLeft: "auto", flexDirection: "column" }}>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <div style={{}}>
                                                    <div style={{}}>
                                                        <p style={{ fontSize: "0.9rem" }}>Código QR:</p>
                                                        <img src="/icon_CodeQr.png" style={{ width: "10rem" }}></img>
                                                    </div>

                                                </div>
                                                <div style={{ marginTop: "1.5rem", marginLeft: "1rem" }}>
                                                    <p style={{ wordBreak: "break-word", maxWidth: "9rem", fontSize: "0.75rem", textAlign: "right" }}>Abra seu aplicativo bancário e escaneie o QR Code para prosseguir com o pagamento
                                                        ou copie o código ao lado e cole-o na aba de Pix copia e cola em seu aplicativo de pagamento. </p>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <button className="btnCopiaCola" type='submit'>Copia e Cola <img src="/icon_CopiaCola.png" style={{ width: "1rem", marginLeft: "0.5rem" }}></img></button>
                                                <div style={{ display: "flex", alignItems: "center", width: "10rem" }}>
                                                    {/* Input para exibir o código de Pix */}
                                                    <input
                                                        type="text"
                                                        value={pixCode}
                                                        readOnly={true} // Impede que o usuário edite o campo
                                                        style={{ width: '100%', border: "2px solid #00000061", outline: "none", borderRadius: "5px", height: "2.3rem", marginTop: "5px", marginLeft: "0.3rem" }} // Estilos opcionais
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}>
                                        <p>Observação: O pagamento deverá ser realizado no prazo de 24 horas.</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
};