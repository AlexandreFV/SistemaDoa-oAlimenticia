"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {useRouter} from "next/navigation";
import jwt from 'jsonwebtoken';

export default function MinhasDoacoes(){
    const router = useRouter();
    const [doacoes, setDoacoes] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token'); // Verifica se há um token no armazenamento local
    
        if (!token) {
          // Se não houver token, redireciona para a página de login
          router.push('/Cadastrar');
        } else {
          // Se houver token, envie uma solicitação para o servidor para obter os detalhes do usuário
          const UserType = localStorage.getItem('userType');
          if(UserType !== 'doador'){
            router.push("/PermissaoNegada");
          } 
        }
      }, []);

    useEffect(() => {
        const fetchDoacoes = async () => {
          try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token); // Decodifica o token para obter o ID do usuário
            const usuariodoadorId = decodedToken.id; // Obtém o ID do usuário doador

            const response = await fetch(`http://localhost:3001/MinhasDoacoes/${usuariodoadorId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              setDoacoes(data.doacoes);
            } else {
              console.error('Erro ao buscar doações:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao buscar doações:', error.message);
          }
        };
    
        fetchDoacoes();
      },[]);

      
      return (
        <div style={{ width: "90%", marginLeft: "5%", marginRight: "5%",marginTop:"40px" }}>
        <Link href="/EnviarDoacao">Enviar Doacao</Link>
          {doacoes.map((doacao, index) => (
            <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid black",marginTop:"30px",backgroundColor: "Red" }}>
              <h3>Doação {index + 1}</h3>
              <p>Nome do alimento: {doacao.nome_alimento}</p>
              <p>Quantidade: {doacao.quantidade}</p>
              <img src={doacao.foto} alt={`Foto da doação ${index + 1}`} style={{ maxWidth: "100px" }} />
              <p>Endereço: {doacao.endereco}</p>
            </div>
          ))}
        </div>
      );
    }
    
