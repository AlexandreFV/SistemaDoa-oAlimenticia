"use client"
import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function Navbar({ isAuthenticated, userEmail, userType }) {
  const router = useRouter();
  
  const handleLogout = () => {
    // Limpar o token do armazenamento local
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    // Redirecionar o usuário para a página de login
    router.push('/Cadastrar');
  };


  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(120, 148, 74, 0.8)", height: "90px", borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px",zIndex: "1000 !important" }}>
      <strong>
        <div style={{ color: "#FFFFFF", marginLeft: "30px", fontFamily: "Inter" }}>
          <h1 style={{ fontSize: "30px" }}>DoeSolidário</h1>
          <p style={{ fontFamily: "Inter", fontWeight: "bold" }}>Sistema de Doação Alimentícia</p>
        </div>
      </strong>

      <div style={{
        color: "#FFFFFF", position: "absolute",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        fontFamily: 'Carter One', fontSize: "20px"
      }}>

        {/* Aplicando estilo condicionalmente para o link "Inicio" */}
        <a style={{
          display: "inline-block",
          marginRight: "40px",
          // Apply conditional styling
        }} id="inicio">
          Inicio
        </a>

        <a style={{ display: "inline-block", marginRight: "40px" }}>Suporte</a>

        <div className="dropdown" style={{ display: "inline-block", marginRight: "40px", position: "relative" }}>
          <button type="button" className="btn-secondary dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Mais
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">


            {/* Exibir itens do menu de forma condicional */}
            {userType === 'intermediario' && (
              <div>
              <Link href={"/ColetarDoacao"} className="dropdown-item" type="button">Anuncio de Doações</Link>
              <Link href={"/ListBenefIntermed"} className="dropdown-item" type="button">Meus Intermediários</Link>
              </div>
            )}
            {userType === 'doador' && (
              <div>
            <Link href={"/facaDoacao"} className="dropdown-item" type="button">Fazer Doação</Link>
            <Link href={"/MeusProdutosVendidos"} className="dropdown-item" type="button">Meus Produtos Doados</Link>
            <Link href={"/MinhasDoacoes"} className="dropdown-item" type="button">Meus Produtos em Doação</Link>

            </div>

            )}
            {userType === 'beneficiario' && (
              <button className="dropdown-item" type="button">Doações Recebidas</button>
            )}
          <button className="dropdown-item" type="button">Ranking de Doações</button>
          <button className="dropdown-item" type="button">Meu perfil</button>
          </div>
        </div>


      </div>

      {/* Exibir imagem de perfil e email do usuário se estiver autenticado */}
      {isAuthenticated && (
        <div style={{ position: 'fixed', top: 5, right: 30, marginTop: "15px" }}>
          <img src="/Loign.png" alt="Perfil" width={40} height={40} />
          <span style={{ marginLeft: "10px", color: "white" }}>{userEmail}</span>
          <p style={{ color: "white", cursor: "pointer" }} onClick={handleLogout}>Sair</p>
        </div>
      )}
    </nav>
  );
}
