"use client"
import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/MenuIntermediario";
import { BackButton, CustomButton } from "../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";

export default function ColetarDoacao() {

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

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleComprarClick = async (id) => {
      console.log("ID:", id);
      const token = localStorage.getItem('token');
    
      try {
        const response = await fetch(`http://localhost:3001/InfoProduto/${id}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          if (response.status === 200){
            router.push(`/InfoProduto?id=${id}`);
          }
        } else {
          console.error("Erro ao buscar informações do produto:", response.statusText);
          if (response.status === 404) {
            alert("Produto não encontrado");
            window.location.reload();
          }
        }
    
      } catch (error) {
        console.error("Erro ao buscar informações do produto:", error);
      }
    };
    
    useEffect(() => {
        const fetchDoacoes = async () => {
          try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt.decode(token);
            const usuariodoadorId = decodedToken.id;
  
              const response = await fetch(`http://localhost:3001/ColetarDoacao/${usuariodoadorId}`, {
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


    return (

        <div className="DPCOLETARDOACAO">
            <Navbar></Navbar>
            <div className="DFCOLETARDOACAO">
                <MenuDireito />
                <div className="DICOLETARDOACAO">
                    <div className="DFPCOLETARDOACAO">
                        <BackButton />
                        <h1 className="h1MinDoaCOLETARDOACAO">Coletar Doação</h1>
                        <div className="DFFCOLETARDOACAO">
                            <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Doações disponíveis</h1>
                                <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                    <img src="./filtrar.png" className="imgFiltrar"></img>
                                    <p >Filtro</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                            {doacoes.map((doacao, index) => (
                            <div key={index} className="CardProduct" style={{ width: "90%", height: "6.4rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}>

                                <div style={{ float: "left" }}>
                                    <img id="imgColetarDoacao" className="IFD" 
                                    src={`data:image/png;base64, ${doacao.imagemBase64}`}
                                    alt={`Foto da doação ${index + 1}`}></img>
                                </div>
                                <div style={{ float: "left" }}>
                                    <div style={{ marginLeft: "1rem", paddingTop: "0.7rem", fontSize: 19, fontFamily: "Inter", fontWeight: "bold" }}>{doacao.usuariodoador.nome}</div>
                                    <div style={{ marginLeft: "1rem", marginTop: "1rem", fontSize: 19, fontFamily: 'Inter', fontWeight: '500', wordWrap: 'break-word' }}><b>Produto:</b> {doacao.nome_alimento}</div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", textAlign: "center", flexWrap: "wrap" }}>
                                    <div style={{ paddingTop: "1.5rem", flex: "1", marginRight: "-5rem", marginLeft: "-10%" }}>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold' }}>Categoria</div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>{doacao.categoria}</div>
                                    </div>
                                    <div style={{ paddingTop: "1.5rem", flex: "1", marginRight: "-5rem" }}>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold' }}>Formato</div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>Caixa</div>
                                    </div>
                                    <div style={{ paddingTop: "1.5rem", flex: "1" }}>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: 'bold' }}>Quantidade</div>
                                        <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '400' }}>{doacao.quantidade}</div>
                                    </div>
                                    <div style={{ marginLeft: "auto", marginTop: "2.5rem", marginRight: "1.5rem" }}>
                                        <div>
                                            <button className="btn btn-primary" style={{ width: "40px",height:"40px", backgroundColor:"green" }} onClick={() => handleComprarClick(doacao.id)}></button>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ clear: "both" }}></div>

                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0", marginLeft: "5%", marginRight: "5%" }}>
                                  <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500' }}><b>Contato: {doacao.usuariodoador.telefone}</b> </div>
                                  <div style={{ fontSize: 16, fontFamily: 'Inter', fontWeight: '500' }}><b>Validade:</b> {new Date(doacao.validade).toLocaleDateString('pt-BR')}</div>
                                </div>

                            </div>
                            ))}


                        </div>
                    </div>
                </div>

            </div>
            

                

        </div>

    );
}