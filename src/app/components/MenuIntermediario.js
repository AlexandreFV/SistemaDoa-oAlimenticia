import CustomButton from "./customButton";
import "./MenuIntermediario.css";

export default function MenuIntermediario() {

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

            <div style={{
                color: "white", backgroundColor: "#FEFEFE", top: -15,
                width: "250px", height: "250px", borderBottomRightRadius: "20px",
                position: "relative", zIndex: 1
            }}>

                <div style={{ paddingTop: "40px", }}>
                    <div style={{ float: "left" }}>
                        <CustomButton href={"/EnviarDoacao"} className={"btnn"} buttonText={"Coletar doação"} textStyle={{ marginLeft: "1rem" }} />
                    </div>
                    <img src="/SetaDireita.png" style={{ marginTop: "4px" }}></img>
                </div>

                <div style={{ paddingTop: "16px" }}>
                    <CustomButton href={"/MinhasDoacoes"} className={"btnn"} buttonText={"Enviar produtos"} textStyle={{ marginLeft: "1rem" }} />
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <CustomButton href={{}} className={"btnn"} buttonText={"Doadores"} textStyle={{ marginLeft: "1rem" }} />
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <CustomButton href={{}} className={"btnn"} buttonText={"Beneficiários"} textStyle={{ marginLeft: "1rem" }} />
                </div>
            </div>
        </div>
    );
}
