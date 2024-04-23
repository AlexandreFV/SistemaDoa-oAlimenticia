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

export default function MeusProdutosVendidos() {
  const router = useRouter();
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/Cadastrar');
    } else {
      const UserType = localStorage.getItem('userType');
      if (UserType !== 'doador') {
        router.push("/PermissaoNegada");
      }
    }
  }, []);

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt.decode(token);
        const usuariodoadorId = decodedToken.id;

        const response = await fetch(`http://localhost:3001/MeusProdutosVendidos/${usuariodoadorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setVendas(data);
          console.log(vendas);
        } else {
          console.error('Erro ao buscar vendas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar vendas:', error.message);
      }
    };

    fetchDoacoes();
  }, []);


  return (
    <div className="DP">
      <Navbar></Navbar>
      <div className="DF">
        <MenuDireito />
        <div className="DI">
          <div className="DFP">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VI"></img>
            <h1 className="HMD">Meus Produtos Vendidos</h1>
            <div className="DFF">
              {vendas.length === 0 ? (
                <div>
                  <img src="/triste.png" className="IT"></img>
                  <h1 className="HND">Você ainda não efetuou nenhuma doação.</h1>
                  <p className="PSP">Seja parte da solução.</p>
                  <p className="PSPD">Sua primeira doação é o primeiro passo para um mundo melhor.</p>
                  <CustomButton href={"/facaDoacao"} className={"BPN"} buttonText={"Doe agora"} />
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                    <h1 className="HPE">Produtos Vendidos</h1>
                    <img src="./filtrar.png" className="IF"></img>
                  </div>

                  <div class="modal-content custom-modal-line" style={{height:"3px"}}> </div>
                  {vendas.map((vendas, index) => (
                    <div>
                      <div key={index} className="DD" >
                        <img
                        id="img"
                          className="IFD"
                          src={`data:image/png;base64, ${vendas.imagemBase64}`}
                          alt={`Foto da doação ${index + 1}`}
                        />

                        <div className="DNA">
                          <p className="NomeAlm" style={{ textAlign: "center" }}>{vendas.nome_alimento}</p>
                        </div>

                        <div className="DC">
                          <label>Quantidade</label>
                          <p className="quantidade" style={{ textAlign: "center" }}>{vendas.quantidade}</p>
                        </div>
                        <div className="DC">
                          <label>Vendido para: </label>
                          <p className="endereco" style={{ textAlign: "center" }}>{vendas.usuariointermediario.nome}</p>
                        </div>
                      </div>
                      <p style={{ marginTop: "-20px", padding: "0px", marginRight: "5%", width: "90%", marginLeft: "5%", textAlign: "right" }}>
                        Data da Venda: {vendas.createdAt && new Date(vendas.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                  
                  ))}
                </div>
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
