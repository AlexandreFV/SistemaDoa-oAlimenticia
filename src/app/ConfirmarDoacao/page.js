"use client"

import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import CustomButton from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Imprima } from "next/font/google";


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
    <div className="DPCONFIRMARDOACAO">
      <Navbar />
      <div className="DFCONFIRMARDOACAO">
        <MenuDireito />
        <div className="DICONFIRMARDOACAO">
          <div className="DFPCONFIRMARDOACAO">

            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIcoCONFIRMARDOACAO"></img>

            <h1 className="h1MinDoaCONFIRMARDOACAO">Coletar Doacao</h1>
            <div className="DFFCONFIRMARDOACAO">
              {doacoes.length === 0 ? (
                <div>
                  <img src="/triste.png" className="IcoTris"></img>
                  <h1 className="h1NpossuiDoacaoCONFIRMARDOACAO">Você ainda não efetuou nenhuma doação.</h1>
                  <p className="PSejaParteCONFIRMARDOACAO">Seja parte da solução.</p>
                  <p className="PSuaPrimeirDCONFIRMARDOACAO">Sua primeira doação é o primeiro passo para um mundo melhor.</p>
                  <CustomButton href={"/FacaDoacao"} className={"btnPermNega"} buttonText={"Doe agora"} />
                </div>
              ) : (
                <div>

                  <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                    <h1 className="h1ProdutosEnvCONFIRMARDOACAO">Confirmar coleta</h1>

                  </div>

                  <div class="modal-content custom-modal-line" style={{height:"3px"}}> </div>

                  {doacoes.map((doacao, index) => (
                    <div>
                      <div style={{ marginTop: "2rem", marginRight: "5%", width: "90%", marginLeft: "5%", }}>

                        <p >
                          Produto  - Nome do doador
                        </p>
                      </div>
                      <div key={index} className="DDCONFIRMARDOACAO" >


                        <img
                          className="imgFotoDoaCONFIRMARDOACAO"
                          src={`data:image/png;base64, ${doacao.imagemBase64}`}
                          alt={`Foto da doação ${index + 1}`}
                        />

                        <div className="DivNomAlmCONFIRMARDOACAO">
                          <p className="NomeAlm" style={{ textAlign: "center" }}>{doacao.nome_alimento}</p>
                        </div>

                        <div className="DivCategCONFIRMARDOACAO">
                          <label>Categoria</label>
                          <p style={{ textAlign: "center" }}>{doacao.categoria}</p>
                        </div>
                        <div className="DivCategCONFIRMARDOACAO">
                          <label>Formato</label>
                          <p className="endereco" style={{ textAlign: "center" }}>{doacao.Formato}</p>
                        </div>
                        <div className="DivCategCONFIRMARDOACAO">
                          <label>Quantidade</label>
                          <p className="quantidade" style={{ textAlign: "center" }}>{doacao.quantidade}</p>
                        </div>
                        <div className="DivCategCONFIRMARDOACAO">
                          <label>Validade</label>
                          <p className="endereco" style={{ textAlign: "center" }}>{doacao.Validade}</p>
                        </div>

                        <img src="./lixeira.png" style={{ height: "20px", marginRight: "10px" }}></img>
                        <img src="./btn-inf.png" style={{ height: "20px", marginRight: "20px" }}></img>
                      </div>

                    </div>

                  ))}
                  <center>

                    <div className="DivButtonUser">
                      <CustomButton href="" className="button btn" buttonText="Confirmar" style={{ display: "flex", textAlign: 'center', alignItens: 'center' }} />
                    </div></center>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
