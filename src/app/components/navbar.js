"use client"
import { right } from '@popperjs/core'
import Link from 'next/link'

export default function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg" 
    style={{height:100 + "px"}}>
      
      <div style={{color:"white", marginLeft:"30px"}}>
        <h1 style={{fontSize:"30px"}}>DoeSolidário</h1>
        <p>Sistema de Doação Alimentícia </p>
      </div>

      <div style={{ color: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <p style={{display:"inline-block", marginRight:"40px",}}>Sistema de Doação Alimentícia </p>
      <p style={{display:"inline-block", marginRight:"40px",}}>Faça sua doação </p>
      <p style={{display:"inline-block", marginRight:"40px"}}>Suporte </p>
      <div class="dropdown" style={{display:"inline-block",marginRight:"40px"}}>
      <button type="button" class="btn-secondary dropdown-toggle"  id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Mais
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button class="dropdown-item" type="button">Action</button>
      <button class="dropdown-item" type="button">Another action</button>
      <button class="dropdown-item" type="button">Something else here</button>
      </div>
      </div>
      </div>

    </nav>
  );
}
