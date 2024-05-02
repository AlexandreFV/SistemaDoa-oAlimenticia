
"use client"
// Importe os módulos necessários
import Navbar from "../components/layoutCadastroLogin";
import { useState } from "react";
import "./style.css";
import { useEffect } from "react";

// Defina o componente AlterarSenha
export default function AlterarSenha() {
    // Defina os estados para armazenar o token, a nova senha e mensagens de erro/sucesso
    const [token, setToken] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    // UseEffect para extrair o token da URL quando o componente for montado
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        setToken(tokenFromUrl);
    }, []);

    // Função para lidar com o envio do formulário
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        // Verificar se as senhas são iguais
        if (novaSenha !== confirmarSenha) {
            setError("As senhas não coincidem.");
            setIsLoading(false);
            return;
        }

        try {
            // Enviar solicitação para redefinir a senha
            const response = await fetch("http://localhost:3001/redefinir-senha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, novaSenha }),
            });
            const data = await response.json();

            // Verificar se houve erro na resposta
            if (!response.ok) {
                throw new Error(data.error || "Erro ao redefinir a senha");
            }
            // Se não houver erro, exibir mensagem de sucesso
            setSuccessMessage(data.message);
        } catch (error) {
            // Se ocorrer um erro, exibir mensagem de erro
            setError(error.message);
        }
  
        setIsLoading(false);
    };

    // Retorne o JSX para renderizar a página de alteração de senha
    return (
        <div className='DPENTRAREMPRESA'>
            <div className="BCENTRAREMPRESA">
                <Navbar />
                <div className="DNENTRAREMPRESA">
                    <div className="DFBAlterarSenha">
                        <div style={{ color: "white", width: "100%", height: "100%" }}>
                            <center>
                                <h1 className='h1EsqueciSenha'>Alterar Senha</h1>
                                <p style={{ paddingTop: "10px" }}>Digite a nova senha</p>
                            </center>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px", color: "black" }}>
                                    <label>Nova Senha</label>
                                    <input
                                        placeholder="Digite a Senha..." className="form-control"
                                        type="password"
                                        id="novaSenha"
                                        value={novaSenha}
                                        onChange={(e) => setNovaSenha(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group" style={{ width: "90%", marginLeft: "5%", marginRight: "5%", marginTop: "20px", color: "black" }}>
                                    <label>Confirmar Senha</label>
                                    <input
                                        placeholder="Confirme a Senha..." className="form-control"
                                        type="password"
                                        id="confirmarSenha"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        required
                                    />
                                </div>
                                <center>
                                    {error && <p className="error alert alert-danger" style={{width:"60%",marginTop:"10px"}}>{error}</p>}
                                    {successMessage && <p className="success alert alert-success" style={{width:"80%",marginTop:"10px"}}>{successMessage}</p>}
                                    <button type="submit" className="btn" disabled={isLoading} style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white", marginTop: "15px" }}>
                                        {isLoading ? "Enviando..." : "Confirmar"}
                                    </button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
