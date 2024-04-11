"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import CustomButton from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';

export default function MinhasDoacoes() {
  const router = useRouter();
  const [doacoes, setDoacoes] = useState([]);
 

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
  }, []);

 

  return (
    <div className="DP">
      <Navbar></Navbar>
      <div className="DF">
        <MenuDireito />
        <div className="DI">
          <div className="DFP">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VI"></img>
            <h1 className="HMD">Minhas doações</h1>
            <div className="DFF">
              {doacoes.length === 0 ? (
                <div>
                  <img src="/triste.png" className="IT"></img>
                  <h1 className="HND">Você ainda não efetuou nenhuma doação.</h1>
                  <p className="PSP">Seja parte da solução.</p>
                  <p className="PSPD">Sua primeira doação é o primeiro passo para um mundo melhor.</p>
                  <CustomButton href={"/FacaDoacao"} className={"BPN"} buttonText={"Doe agora"} />
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                    <h1 className="HPE">Produtos Doados</h1>
                    <img src="./filtrar.png" className="IF"></img>
                  </div>

                  <div class="modal-content custom-modal-line"> </div>
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

                        <img src="./edit.png" style={{ height: "20px", marginRight: "10px" }}></img>
                        <img src="./lixeira.png" style={{ height: "20px", marginRight: "20px" }}></img>
                      </div>
                      <p style={{ marginTop: "-20px", padding: "0px", marginRight: "5%", width: "90%", marginLeft: "5%", textAlign: "right" }}>
                        Data de doação: {doacao.createdAt && new Date(doacao.createdAt).toLocaleDateString()}
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
