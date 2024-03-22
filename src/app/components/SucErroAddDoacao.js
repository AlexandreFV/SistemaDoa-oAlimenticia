import React from 'react';
import "./ErroAddDoacao.css"

const SucErroAddDoacao = ({ ErroAddDoa, SuccessAddDoa }) => {
    return (
        <div className='divErroAdDoa' style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "white", height: "80px",
            width: "270px", textAlign: "center", borderRadius: "10px", border: "1px solid black", display: "flex",
            alignItems: "center", justifyContent: "center", animation: "slide-in 1s ease forwards, slide-out 1s ease forwards 2s, fade-out 1s ease forwards 3s"
        }}>
            {ErroAddDoa && ( // Verifica se há mensagem de erro
                <>
                    <img style={{ height: "80px", width: "100px" }} src="./error.png" alt="Error"></img>
                    <p>{ErroAddDoa}</p>
                </>
            )}
            {SuccessAddDoa && ( // Verifica se há mensagem de sucesso
                <>
                    <img style={{ height: "80px", width: "100px" }} src="./checked.png" alt="Success"></img>
                    <p>{SuccessAddDoa}</p>
                </>
            )}
        </div>
    );
}

export default SucErroAddDoacao;
