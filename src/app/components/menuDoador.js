
import { useEffect, useState } from "react";
import CustomButton from "./customButton"
import './menuDoador.css';
import ModalIntegracao from "./modalIntegracao";
import jwt from 'jsonwebtoken';

export default function menuDoador() {
    const [linkIntegracao,setLinkIntegracao] = useState("");
    const [NIntegrado, setNIntegrado] = useState(false);

    useEffect(() => {
        const verificarIntegracao = async () => {
            const userIdStripe = localStorage.getItem("IdStripe");
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            try{
            const response = await fetch (`http://localhost:3001/VerificarIntegracao/${userIdStripe}`,{
                'Authorization': `Bearer ${token}`
            })
            if(response.ok){
            const data = await response.json();
                if(data.loginLink){
                setLinkIntegracao(data.loginLink.url);
                setNIntegrado(true);
                }
            }
            }catch(error){
                console.error('Erro ao buscar integracao:', error.message);
            }
        }; verificarIntegracao();
    }, []);

    return (

        
        <div style={{ position: "relative", display: "inline-block", maxheight: "230px", maxwidth: "250px" }}>
             {NIntegrado && <ModalIntegracao linkIntegracao={linkIntegracao} />}

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
                        <CustomButton rel="preload" href={"/facaDoacao"} className={"btnn"} buttonText={"Fazer Doação"} textStyle={{ marginLeft: "1rem" }} />
                    </div>
                    <img src="/SetaDireita.png" style={{ marginTop: "4px" }}></img>
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <CustomButton rel="preload" href={"/MinhasDoacoes"} className={"btnn"} buttonText={"Meus Produtos à Venda"} textStyle={{ marginLeft: "1rem" }} />
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <CustomButton rel="preload" href={"/MeusProdutosVendidos"} className={"btnn"} buttonText={"Meus Produtos vendidos"} textStyle={{ marginLeft: "1rem" }} />
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <CustomButton rel="preload" href={"/MinhaClassificacaoDoador"} className={"btnn"} buttonText={"Nível de classificação"} textStyle={{ marginLeft: "1rem" }} />
                </div>
            </div>
        </div>
    )
}