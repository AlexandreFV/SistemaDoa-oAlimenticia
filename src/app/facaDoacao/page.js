"use client"
import "./style.css";
import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Menu from"../components/menuDoador";

const AddProductPage = () => {
  return (
    <div>
      <h1>Cadastrar Produto</h1>
      <ProductForm />
    </div>
  );
};

export default function facaDoacao () {
  const [product, setProduct] = useState({
    name: '',
    format: '',
    quantity: '',
    category: '',
    expiryDate: '',
    photo: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verifica se o valor é um número ou uma string vazia
    if (name === 'quantity' && !isNaN(value)) {
      setProduct({ ...product, [name]: value });
    } else if (name !== 'quantity') {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do produto para o backend ou realizar outras ações.
    console.log(product);
  };

  return (
    <div className="DivPai">
      <Navbar />
      <div className="DivFilho">
        <Menu />
        
        <div className="DivImagem">
          <div className="DivFundoPai">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco"></img>
            <h1 className="titulo">Faça sua doação</h1>
            <div className="DivFundoFilho">
            <form onSubmit={handleSubmit}>
      <label>
        Nome do Produto:
        <input type="text" name="name" placeholder="Digite o nome do produto..." value={product.name} onChange={handleChange} />
        
      </label>
      <label>
      Formato do Produto:
        <select name="format" placeholder="Ex: Caixa ou Avulso." value={product.format} onChange={handleChange}>
          <option value="Caixa">Caixa</option>
          <option value="Avulso">Avulso</option>
        </select>
      </label>
      <label>
        Quantidade:
        <input type="text" name="quantity" placeholder="quant." value={product.quantity} onChange={handleChange} />
      </label>
      <label>
        Categoria:
        <input type="text" name="category" placeholder="selec.a categ" value={product.category} onChange={handleChange} />
      </label>
      <label>
        Validade do produto:
        <input type="date" name="expiryDate" placeholder="selecione a data..." value={product.expiryDate} onChange={handleChange} />
      </label>
      <label>
        Foto do Produto:
        <input type="file" name="photo" onChange={handleChange} />
      </label>
      <label>
        Descrição:
        <textarea name="description" placeholder="Digite mais detalhes..." value={product.description} onChange={handleChange} />
      </label>
      <button type="submit">Cadastrar Produto</button>
    </form>
            </div>

    </div>
    </div>
    </div>
    
     
    
    
    </div>
  );
};



