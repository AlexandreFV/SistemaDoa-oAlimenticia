"use client"
import { useEffect, useState } from "react";
import "./style.css";

export default function ListarBeneficiario(){
    const [beneficiario, setBeneficiario] = useState([]);
    useEffect(() => {
        const ListarBeneficiario = async () => {
        try{
            const token = localStorage.getItem('token');

            const response = await fetch ("http://localhost:3001/ListarBeneficiario",{
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                if(response.ok){
                const data = await response.json();
                setBeneficiario(data.contagemDoacoesPorBeneficiario);

                }
        }catch (error){
            console.error('Erro ao buscar beneficiarios:', error.message);

        }
        }
        ListarBeneficiario();
    }, []);

    useEffect(() => {
        console.log(beneficiario); // Verificar o estado atualizado
    }, [beneficiario]); // Dependência beneficiario
    

    return (

        <div>

        </div>
    )
}