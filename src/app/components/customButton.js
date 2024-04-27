import React from 'react';
import Link from 'next/link';
import './menuDoador.css';
import { useRouter } from 'next/navigation';

const CustomButton = ({ href, className, buttonText, textStyle, onClick }) => {
    return (
        <Link href={href}>
            <button className={className} onClick={onClick}>
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

export const BackButtonProdutosBenef = () => {
    const router = useRouter();
    const goBack = () => {
        window.location.reload();
    };

    return (
        <button onClick={goBack}><img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco" /></button>
    );
};