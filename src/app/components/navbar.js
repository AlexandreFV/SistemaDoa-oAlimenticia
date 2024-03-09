"use client"
import { useState } from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ height: "100px" }}>
      <strong>
        <div style={{ color: "#FFFFFF", marginLeft: "30px", fontFamily: "Inter" }}>
          <h1 style={{ fontSize: "30px" }}>DoeSolidário</h1>
          <p style={{ fontFamily: "Inter", fontWeight: "bold" }}>Sistema de Doação Alimentícia</p>
        </div>
      </strong>

      <div style={{
        color: "#FFFFFF", position: "absolute",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        fontFamily: 'Carter One', fontSize: "20px"
      }}>

        {/* Aplicando estilo condicionalmente para o link "Inicio" */}
        <a style={{
          display: "inline-block",
          marginRight: "40px",
          // Apply conditional styling
        }} id="inicio">
          Inicio
        </a>

        <a style={{ display: "inline-block", marginRight: "40px" }}>Faça sua doação</a>
        <a style={{ display: "inline-block", marginRight: "40px" }}>Suporte</a>

        <div className="dropdown" style={{ display: "inline-block", marginRight: "40px", position: "relative" }}>
          <button type="button" className="btn-secondary dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Mais
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">Action</button>
            <button className="dropdown-item" type="button">Another action</button>
            <button className="dropdown-item" type="button">Something else here</button>
            </div>
            </div>

          
      </div>

        {/* Botões "Entrar" e "Cadastrar" */}
        <div style={{ position: 'fixed', top: 5, right: 30, marginTop:"15px"}}>
              <button className="btn" style={{color:"white"}}>Entrar</button>
              <button className="btn btn-success" style={{ marginLeft: "10px",color:"white" }}>Cadastrar</button>
            </div>
    </nav>
  );
}
