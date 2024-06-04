"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
    const goBack = () => {
        window.history.back(); // Função para voltar para a página anterior
    };

    return (

        <button onClick={goBack}><img src="/iconbtnvoltarwhite.png" alt="Ícone de voltar" className="VoltarIco" style={{ marginTop: "3rem", marginLeft: "5rem", width: "3.5rem" }} /></button>

    );
};

export const BackButton2 = () => {
    const goBack = () => {
        window.history.back(); // Função para voltar para a página anterior
    };

    return (

        <button onClick={goBack}><img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco" style={{ marginTop: "3rem", marginLeft: "5rem", width: "3.5rem" }} /></button>

    );
};