import { useState } from 'react';
import "./modalEnviarProd.css";

export default function modalEnviarProd({ selectedProducts, selectedProductNames, selectedProductQuantities, idBenef }) {

    const [envioRealizado, setEnvioRealizado] = useState(false);

    const hundleConfirmar = async () => {
        try {
            const token = localStorage.getItem('token');
            const requestBody = {
                idBenef: idBenef,
                quantidade: selectedProductQuantities,
                id: selectedProducts
            };
            
            const response = await fetch(`http://localhost:3001/EnviarParaBenef`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if(response.ok){
                setEnvioRealizado(true);
                window.location.reload();
            }
            // Trate a resposta conforme necessário
        } catch (error) {
            console.error('Erro ao enviar produtos para o beneficiário:', error.message);
            // Trate o erro conforme necessário
        }
    };

    return (
        <div>
            <div className="FundoModalEnviarProd">
                <p style={{ color: "white", position: "relative", top: "5px", left: "10px" }}>
                    Produtos Selecionados:
                    {selectedProducts.map((productId, index) => (
                        <span key={index}>
                            {selectedProductNames[index]}
                            {index !== selectedProducts.length - 1 && ", "}
                        </span>
                    ))}
                </p>
                <p style={{ color: "white", position: "relative", top: "5px", left: "10px" }}>
                    Quantidade Selecionadas:
                    {selectedProducts.map((productId, index) => (
                        <span key={index}>
                            {selectedProductQuantities[index]}
                            {index !== selectedProducts.length - 1 && ", "}
                        </span>
                    ))}
                </p>
                <p>{idBenef}</p>
                <button className="btnEnviarModalEnviar" onClick={hundleConfirmar} disabled={envioRealizado}>
                    {envioRealizado ? "Enviado" : "Confirmar"}
                </button>
            </div>
        </div>
    );
}
