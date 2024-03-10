"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {useRouter} from "next/navigation";

export default function MinhasDoacoes(){
    const router = useRouter();
    const [doacoes, setDoacoes] = useState([]);
    const usuariodoadorId = localStorage.getItem('userId'); // Recupera o ID do usuário logado armazenado no localStorage


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
            const response = await fetch(`http://localhost:3001/MinhasDoacoes/${usuariodoadorId}`);
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
      }, [usuariodoadorId]);

      
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
    
