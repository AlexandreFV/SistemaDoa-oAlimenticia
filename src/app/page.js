import Image from "next/image";

export default function Home() {
  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{fontSize:"30px", color:"#78E038"}}>Unindo quem PRODUZ com quem PRECISA!</h1>
      <h1 style={{fontSize:"25px", marginTop:"10px", color:"white"}}>Juntos, combatemos o desperdício e a fome.</h1>
      <button className="btn btn-primary" style={{backgroundColor:"#3FADB4", fontSize:"20px", marginTop:"30%",
      borderColor:"#3FADB4", fontFamily:"Arial"}}>
      <span>Junte-se à nossa</span><br />
      <span>Comunidade Solidária</span>
      </button>
    </div>
  </div>
 
  );
}
