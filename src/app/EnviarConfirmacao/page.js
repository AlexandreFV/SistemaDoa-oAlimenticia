"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import CustomButton from "../components/customButton";
import ModalExclusao from "../components/modalExclusao";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';

export default function EnviarConfirmacao() {

  const [isChecked, setIsChecked] = useState(false);
    const [doacoes, setDoacoes] = useState([]);
    const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/Cadastrar');
    } else {
      const UserType = localStorage.getItem('userType');
      if (UserType !== 'intermediario') {
        router.push("/PermissaoNegadaIntermediario");
      }
    }
  }, []);

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/ColetarDoacao`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          
        });
        if (response.ok) {
          const data = await response.json();
          setDoacoes(data);
        } else {
          console.error('Erro ao buscar doações:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar doações:', error.message);
      }
    };

    fetchDoacoes();
  }, []);

  const handleApagarDoacao = (id) => {
    setDoacaoIdToDelete(id);
    console.log(doacaoIdToDelete);
  };


  return (
    <div className="DP">
      <Navbar></Navbar>
      <div className="DF">
        <MenuDireito />
       

        <div className="DI">
          <div className="DFP">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VI"></img>
            <h1 className="HMD">Enviar produtos doados</h1>
            <div className="DFF">
              
               
                <div>
                  <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                    <h1 className="HPE">Confirmar envio</h1>
                    <img src="./filtrar.png" className="IF"></img>
                  </div>
                    
                  <div class="modal-content custom-modal-line" style={{height:"3px"}}> </div>
                  <h1 className="NameB">Nome do Beneficiario</h1>
                  {doacoes.map((doacao, index) => (
                    <div>
                      
                      <div key={index} className="DD" >
                        <img
                        id="img"
                          className="IFD"
                          src={`data:image/png;base64, ${doacao.imagemBase64}`}
                          alt={`Foto da doação ${index + 1}`}
                        />

                        <div className="DNA">
                          <p className="NomeAlm" style={{ textAlign: "center" }}>{doacao.nome_alimento}</p>
                        </div>

                        <div className="DC">
                          <label>Categoria</label>
                          <p style={{ textAlign: "center" }}>{doacao.categoria}</p>
                        </div>

                        <div className="DC">
                          <label>Quantidade</label>
                          <p className="quantidade" style={{ textAlign: "center" }}>{doacao.quantidade}</p>
                        </div>
                        <div className="DC">
                          <label>Cidade</label>
                          <p className="endereco" style={{ textAlign: "center" }}>{doacao.cidade}</p>
                        </div>

                        <button style={{ height: "30px", marginRight: "20px" }} type="button" data-toggle="modal" data-target="#exampleModalCenter"  onClick={() => handleApagarDoacao(doacao.id)}>
                        <img src="./lixeira.png" style={{ height: "20px"}}></img>
                        </button>

                      </div>
                      <p style={{ marginTop: "-20px", padding: "0px", marginRight: "5%", width: "90%", marginLeft: "5%", textAlign: "right" }}>
                        Data de doação: {doacao.createdAt && new Date(doacao.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                  
                  ))}
                </div>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
