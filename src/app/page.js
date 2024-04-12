"use client"
import Image from "next/image";
import React, { useState,useEffect } from 'react';
import Navbar from './components/navbar'; // Import the component
import Footer from './components/footer';
import {useRouter} from "next/navigation";


export default function Home() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState(""); // Adicione o estado para o tipo de usuário
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Verifica se há um token no armazenamento local

    if (!token) {
      // Se não houver token, redireciona para a página de login
      router.push('/Cadastrar');
    } else {
      // Se houver token, envie uma solicitação para o servidor para obter os detalhes do usuário
      fetchUserDetails(token);

    }
  }, []);


  const fetchUserDetails = async (token) => {
    try {

      const response = await fetch("http://localhost:3001/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const tipoUsuario = data.tipoUsuario; // Extrai o tipo de usuário dos detalhes retornados pelo servidor

        // Redireciona ou renderiza a página Home com base no tipo de usuário
        if (tipoUsuario === 'doador') {
        // Extrai o nome do usuário dos detalhes retornados pelo servidor
        const { nome, email } = data;
        setUserName(nome);
        setUserEmail(email);
        setAuthenticated(true);  
        setUserType(tipoUsuario); // Defina o tipo de usuário

      } else if (tipoUsuario === 'intermediario') {
        const { nome, email } = data;
        setUserName(nome);
        setUserEmail(email);
        setAuthenticated(true);  
        setUserType(tipoUsuario); // Defina o tipo de usuário
      } else if (tipoUsuario === 'beneficiario') {
        // Extrai o nome do usuário dos detalhes retornados pelo servidor
        const { nome, email } = data;
        setUserName(nome);
        setUserEmail(email);
        setAuthenticated(true);  
        setUserType(tipoUsuario); // Defina o tipo de usuário

      }
      else if (tipoUsuario === 'empresa') {
        // Extrai o nome do usuário dos detalhes retornados pelo servidor
        const { nome, email } = data;
        setUserName(nome);
        setUserEmail(email);
        setAuthenticated(true);  
        setUserType(tipoUsuario); // Defina o tipo de usuário

      }

      } else {
        // Se a solicitação falhar, redirecione para a página de login
        router.push('/Cadastrar');
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário:", error);
    }
  };


  if (!authenticated) {
    // Se não autenticado, não renderiza o conteúdo da página Home
    return null;
  }
  return (

    <div>

    <div className="background-image">
    <Navbar isAuthenticated={authenticated} userEmail={userEmail} userType={userType} />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: "30px", color: "#78E038" }}>Unindo quem PRODUZ com quem PRECISA!</h1>
          <h1 style={{ fontSize: "25px", marginTop: "10px", color: "white" }}>Juntos, combatemos o desperdício e a fome.</h1>
          <p style={{ color: "white" }}>Bem-vindo, {userName}!</p> {/* Exibe o nome do usuário */}

          <button className="btn btn-primary" style={{ backgroundColor: "#3FADB4", fontSize: "20px", marginTop: "30%", borderColor: "#3FADB4", fontFamily: "Arial" }}>
            <span>Junte-se à nossa</span><br />
            <span>Comunidade Solidária</span>
          </button>
        </div>
        </div>

      </div>
      <Footer />


    </div>



  );
}
