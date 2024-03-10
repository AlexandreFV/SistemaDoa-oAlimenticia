import Link from "next/link";
import Navbar from "../components/layoutCadastroLogin";

export default function CadastroDoador(){

    return(

        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="background-Cadastro">

        <Navbar />


    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
    <div style={{ backgroundColor: "#EDEDED", height: "450px", width: "60%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px" }}>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",position:"absolute",left:0,marginLeft:"100px" }}>
      <h1 style={{ fontSize: "25px", marginBottom: "10px", marginTop: "10px", fontFamily: "Inter", fontWeight: "800" }}>Já possui conta?</h1>
      <p style={{ fontFamily: "Inter", fontWeight: "400", marginBottom: "20px" }}>Entre e seja Solidário.</p>
      <Link href="/EntrarDoador"><button className="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white", width: "100px", height: "40px" }}>Entrar</button></Link>
    </div>

    <div style={{color:"white", backgroundColor: "#578925", width: "430px", height: "500px", borderRadius: "10px", position: "absolute", right: 0,marginRight:"50px" }}>
        <center>
        <h1 style={{ fontSize: "25px", marginTop: "30px", fontFamily: "Poller One cursive", fontWeight: "800" }}>Cadastro Doador</h1>
        </center>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Nome Completo</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite seu nome completo..." 
        style={{backgroundColor:"transparent"}}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Email</label>
        <input type="Email" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite seu e-mail..." 
        style={{backgroundColor:"transparent"}}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">CPF</label>
        <input type="text" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="XXX.XXX.XXX-XX" 
        style={{backgroundColor:"transparent"}}/>
    </div>

    <div class="form-group" style={{width:"90%",marginLeft:"5%",marginRight:"5%",marginTop:"20px"}}>
        <label for="exampleInputEmail1">Senha</label>
        <input type="password" class="form-control" id="exampleInputEmail1" 
        aria-describedby="emailHelp" placeholder="Digite sua senha..."
        style={{backgroundColor:"transparent"}} />
    </div>
        <center>
        <button className="btn" style={{ backgroundColor: "rgba(63, 173, 180, 0.87)", color: "white",marginTop:"40px"}}>Cadastrar</button>
        </center>
    </div>

  </div>
</div>
</div>
</div>
    )
}