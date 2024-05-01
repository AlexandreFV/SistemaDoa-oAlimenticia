import "./footer.css";
import React, { useEffect } from "react";

export default function Footer() {
    useEffect(() => {
        const elements = document.querySelectorAll(".VirDaEsquerda, .VirDaDireita");
        const windowHeight = window.innerHeight;

        function checkVisibility() {
            elements.forEach((element) => {
                const elementPosition = element.getBoundingClientRect().top;
                const isVisible = elementPosition < windowHeight * 0.75;
                if (isVisible) {
                    element.classList.add("visible");
                    element.classList.remove("hideLeft", "hideRight"); // Remove as classes de esconder ao mostrar
                } else {
                    if (!element.classList.contains("visible")) { // Verifica se a classe visible não está presente
                        // Adiciona as classes de esconder ao sumir
                        if (element.classList.contains("VirDaEsquerda")) {
                            element.classList.add("hideLeft");
                        } else if (element.classList.contains("VirDaDireita")) {
                            element.classList.add("hideRight");
                        }
                    }
                }
            });
        }        
    
        window.addEventListener("scroll", checkVisibility);
    
        // Verificar a visibilidade inicial ao montar o componente
        checkVisibility();
    
        return () => {
            window.removeEventListener("scroll", checkVisibility);
        };
    }, []);

    return (
        <div className="FundoSistemaFunciona" style={{ height: "auto", width: "100%", position: "absolute", marginTop: "0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "100%" }}>
                <h1 style={{ paddingTop: "10px", color: "black", fontFamily: "initial", fontSize: "20px", textAlign: "center" }}>Como nosso Sistema Funciona?</h1>
                <div className="AnimacaoFooterComoFunciona">

                    <div className="VirDaEsquerda" style={{ display: "flex", alignItems: "center", width: "40%", backgroundColor: "rgb(120 148 74)", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "150px", marginTop: "30px" }}>
                        <p style={{ width: "90%", paddingLeft: "50px", color: "white" }}>
                            Nosso objetivo é facilitar a venda de produtos avariados que ainda podem ser consumidos, mas não atendem aos regulamentos de venda de mercados e grandes comércios.
                        </p>
                        <img style={{ height: "80px", width: "100px", marginRight: "10px" }} src="./apple.png" alt="Logo da Apple" />
                    </div>

                    <div className="VirDaDireita" style={{ display: "flex", alignItems: "center", marginLeft: "auto", width: "40%", backgroundColor: "rgb(63, 173, 180)", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px", height: "150px", marginTop: "30px" }}>
                        <img style={{ height: "80px", width: "100px", marginLeft: "10px" }} src="./sale-tag.png" alt="Logo da Apple" />
                        <p style={{ width: "90%", paddingRight: "50px", color: "white" }}>
                            1. Anúncios de Vendas pelos Produtores:
                            Produtores podem anunciar seus produtos avariados a preço de custo em nossa plataforma.
                        </p>
                    </div>

                    <div className="VirDaEsquerda" style={{ display: "flex", alignItems: "center", width: "40%", backgroundColor: "rgb(120 148 74)", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "150px", marginTop: "30px" }}>
                        <p style={{ width: "90%", paddingLeft: "50px", color: "white" }}>
                            2. Compra por Intermediários:
                            Intermediários podem adquirir esses produtos usando recursos financeiros de empresas parceiras.
                        </p>
                        <img style={{ height: "80px", width: "100px", marginRight: "10px" }} src="./intermediary.png" alt="Logo da Apple" />
                    </div>

                    <div className="VirDaDireita" style={{ display: "flex", alignItems: "center", marginLeft: "auto", width: "40%", backgroundColor: "rgb(63, 173, 180)", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px", height: "150px", marginTop: "30px" }}>
                        <img style={{ height: "80px", width: "100px", marginLeft: "10px" }} src="./income.png" alt="Logo da Apple" />
                        <p style={{ width: "90%", paddingRight: "50px", color: "white" }}>
                            3. Auxílio Financeiro para Intermediários:
                            Empresas podem selecionar intermediários para receberem um auxílio financeiro para realizar as compras.
                        </p>
                    </div>

                    <div className="VirDaEsquerda" style={{ display: "flex", alignItems: "center", width: "40%", backgroundColor: "rgb(120 148 74)", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", height: "150px", marginTop: "30px" }}>
                        <p style={{ width: "90%", paddingLeft: "50px", color: "white" }}>
                            4. Atribuição aos Beneficiários:
                            Os intermediários podem atribuir esses produtos a beneficiários, usuários que se cadastram para receber essas doações.
                        </p>
                        <img style={{ height: "80px", width: "100px", marginRight: "10px" }} src="./recipient.png" alt="Logo da Apple" />
                    </div>

                    <h1 style={{ textAlign: "center", paddingTop: "40px",fontFamily: "initial", fontSize: "20px" }}>Junte-se a nós para evitar o desperdício e contribuir para uma sociedade melhor.</h1>
                </div>
            </div>
        </div>
    );
}
