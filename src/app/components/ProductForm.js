// components/ProductForm.js
import React, { useState } from 'react';

const ProductForm = () => {
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
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do produto para o backend ou realizar outras ações.
    console.log(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" name="name" value={product.name} onChange={handleChange} />
      </label>
      <label>
        Formato:
        <input type="text" name="format" value={product.format} onChange={handleChange} />
      </label>
      <label>
        Quantidade:
        <input type="text" name="quantity" value={product.quantity} onChange={handleChange} />
      </label>
      <label>
        Categoria:
        <input type="text" name="category" value={product.category} onChange={handleChange} />
      </label>
      <label>
        Validade:
        <input type="date" name="expiryDate" value={product.expiryDate} onChange={handleChange} />
      </label>
      <label>
        Foto:
        <input type="file" name="photo" onChange={handleChange} />
      </label>
      <label>
        Descrição:
        <textarea name="description" value={product.description} onChange={handleChange} />
      </label>
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
};

export default ProductForm;
