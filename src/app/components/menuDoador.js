
import CustomButton from "./customButton"
import './menuDoador.css';
export default function menuDoador() {


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