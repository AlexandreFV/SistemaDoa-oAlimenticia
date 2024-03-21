import Link from "next/link";
import "./menuDoador.css"
export default function layoutCadastroLogin() {


  return (
    <nav className="navbar navbar-expand-lg" style={{
      backgroundColor: "rgba(120, 148, 74, 0.8)", height: "100px",
      borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px"
    }}>
      <strong>
        <div style={{ color: "#FFFFFF", marginLeft: "30px", fontFamily: "Inter" }}>
          <h1 style={{ fontSize: "30px" }}>DoeSolidário</h1>
          <p style={{ fontFamily: "Inter", fontWeight: "bold" }}>Sistema de Doação Alimentícia</p>
        </div>
      </strong>

      <div style={{ position: 'fixed', top: 5, right: 30, marginTop: "25px" }}>
        <Link href="/"><button className="btn" style={{ color: "white", borderRadius: "10px", border: "2px solid #FFF", width: "6rem" }}>Inicio</button></Link>
        <button className="btn" style={{ marginLeft: "10px", color: "white", backgroundColor: "#7842A3" }}>Suporte</button>
      </div>
    </nav>

  )
}


