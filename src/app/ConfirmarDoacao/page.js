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
    <div className="DivPai">
      <Navbar />
      <div className="DivFilho">
        <MenuDireito />
        <div className="DivImagem">
          <div className="DivFundoPai">

            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco"></img>

            <h1 className="h1MinDoa">Coletar Doacao</h1>
            <div className="DivFundoFilho">
              {doacoes.length === 0 ? (
                <div>
                  <img src="/triste.png" className="IcoTris"></img>
                  <h1 className="h1NpossuiDoacao">Você ainda não efetuou nenhuma doação.</h1>
                  <p className="PSejaParte">Seja parte da solução.</p>
                  <p className="PSuaPrimeirD">Sua primeira doação é o primeiro passo para um mundo melhor.</p>
                  <CustomButton href={"/FacaDoacao"} className={"btnPermNega"} buttonText={"Doe agora"} />
                </div>
              ) : (
                <div>

                  <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                    <h1 className="h1ProdutosEnv">Confirmar coleta</h1>

                  </div>

                  <div class="modal-content custom-modal-line"> </div>

                  {doacoes.map((doacao, index) => (
                    <div>
                      <div style={{ marginTop: "2rem", marginRight: "5%", width: "90%", marginLeft: "5%", }}>

                        <p >
                          Produto  - Nome do doador
                        </p>
                      </div>
                      <div key={index} className="DivDoacao" >


                        <img
                          className="imgFotoDoa"
                          src={`data:image/png;base64, ${doacao.imagemBase64}`}
                          alt={`Foto da doação ${index + 1}`}
                        />

                        <div className="DivNomAlm">
                          <p className="NomeAlm" style={{ textAlign: "center" }}>{doacao.nome_alimento}</p>
                        </div>

                        <div className="DivCateg">
                          <label>Categoria</label>
                          <p style={{ textAlign: "center" }}>{doacao.categoria}</p>
                        </div>
                        <div className="DivCateg">
                          <label>Formato</label>
                          <p className="endereco" style={{ textAlign: "center" }}>{doacao.Formato}</p>
                        </div>
                        <div className="DivCateg">
                          <label>Quantidade</label>
                          <p className="quantidade" style={{ textAlign: "center" }}>{doacao.quantidade}</p>
                        </div>
                        <div className="DivCateg">
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
