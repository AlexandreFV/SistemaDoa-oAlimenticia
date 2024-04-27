"use client"

import Navbar from "../../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../../components/MenuIntermediario";
import { BackButtonProdutosBenef, CustomButton } from "../../components/customButton";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import { Cedarville_Cursive } from "next/font/google";
import ModalEnviarProd from "../../components/modalEnviarProd";

const ProdutosBenef = ({idBenef,nomeBenef}) => {
    const router = useRouter();
    const [produtos, setProdutos] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]); // Estado para armazenar os produtos selecionados
    const [selectedProductNames, setSelectedProductNames] = useState([]);
    const [selectedProductQuantities, setSelectedProductQuantities] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
         
        if(!token){
            router.push("/Cadastrar");
        }else {

        const userType = localStorage.getItem("userType");
        if(userType != "intermediario"){
            router.push("/PermissaoNegadaIntermediario");
        }
        } 
    })

    useEffect(() => {
        const fetchDoacoes = async () => {
          try {
            const token = localStorage.getItem('token');
        
                const response = await fetch(`http://localhost:3001/ProdutosBenef/${idBenef}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
        
                if (response.ok) {
                  const data = await response.json();
                  console.log(idBenef);

                  setProdutos(data.doacoesComImagens);

                } else {
                  console.error('Erro ao buscar doações:', response.statusText);
                }

            } catch (error) {
              console.error('Erro ao buscar doações:', error.message);
            }
          };
        
          fetchDoacoes();
        }, []);
    
        const handleProductSelect = (productId, productName, productQuantity) => {
            setSelectedProducts((prevSelectedProducts) => {
                const isSelected = prevSelectedProducts.includes(productId);
                if (isSelected) {
                    // Remove o produto da lista de produtos selecionados
                    const newSelectedProducts = prevSelectedProducts.filter((id) => id !== productId);
                    const indexToRemove = selectedProductNames.findIndex((name) => name === productName);
                    const newSelectedProductNames = [...selectedProductNames.slice(0, indexToRemove), ...selectedProductNames.slice(indexToRemove + 1)];
                    const newSelectedProductQuantities = [...selectedProductQuantities.slice(0, indexToRemove), ...selectedProductQuantities.slice(indexToRemove + 1)];
                    setSelectedProductNames(newSelectedProductNames);
                    setSelectedProductQuantities(newSelectedProductQuantities);
                    return newSelectedProducts;
                } else {
                    // Adiciona o produto à lista de produtos selecionados
                    const newSelectedProducts = [...prevSelectedProducts, productId];
                    const newSelectedProductNames = [...selectedProductNames, productName];
                    const newSelectedProductQuantities = [...selectedProductQuantities, productQuantity];
                    setSelectedProductNames(newSelectedProductNames);
                    setSelectedProductQuantities(newSelectedProductQuantities);
                    return newSelectedProducts;
                }
            });
        };
        
        
        
        
    
    
        
        
            

    return (
        <div className="DPCOLETARDOACAO">
        <Navbar></Navbar>
        <div className="DFCOLETARDOACAO">
            <MenuDireito />
            <div className="DICOLETARDOACAO">
                <div className="DFPCOLETARDOACAO">
                {selectedProducts.length > 0 && 
                    <ModalEnviarProd 
                        selectedProducts={selectedProducts} 
                        selectedProductNames={selectedProductNames} 
                        selectedProductQuantities = {selectedProductQuantities}
                        idBenef={idBenef}
                    />
                }
                    <BackButtonProdutosBenef />
                    <h1 className="h1MinDoaCOLETARDOACAO">Enviar produtos doados</h1>
                    <div className="DFFCOLETARDOACAO">
                        <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                            <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1ProdutosEnv">Produtos disponíveis para {nomeBenef}</h1>
                            <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                <img src="./filtrar.png" className="imgFiltrar"></img>
                                <p>Filtro</p>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "black", width: "100%", height: "2px" }}></div>
                        {produtos.map((doacao, index) => (
                        <div key={index} className="CardProduct" style={{ width: "90%", height: "6.4rem", background: "#EBEBEB", borderRadius: "10px", marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}>

                            <div style={{ float: "left" }}>
                                <img id="imgColetarDoacao" className="IFD" 
                                src={`data:image/png;base64, ${doacao.imagemBase64}`}
                                alt={`Foto da doação ${index + 1}`}></img>
                            </div>
                            <div style={{ float: "left" }}>
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
                                    <input
                                        type="checkbox"
                                        id={`product-${index}`}
                                        value={doacao.id} // Você pode definir o valor do checkbox como o ID do produto
                                        checked={selectedProducts.includes(doacao.id)} // Verifica se o produto está na lista de produtos selecionados
                                        onChange={() => handleProductSelect(doacao.id,doacao.nome_alimento,doacao.quantidade)} // Lidar com a seleção/deseleção do produto
                                    />                                    </div>
                                </div>
                            </div>

                            <div style={{ clear: "both" }}></div>

                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0", marginLeft: "5%", marginRight: "5%" }}>
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
export default ProdutosBenef;
