import React from 'react';
import Link from 'next/link';
import './menuDoador.css';

const CustomButton = ({ href, className, buttonText, textStyle }) => {
    return (
        <Link href={href}>
            <button className={className}>
                <span style={textStyle}>{buttonText}</span>
            </button>
        </Link>
    );
}

export default CustomButton;

export const BackButton = () => {
    const goBack = () => {
        window.history.back(); // Função para voltar para a página anterior
    };

    return (
        <button onClick={goBack}><img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco" /></button>
    );
};