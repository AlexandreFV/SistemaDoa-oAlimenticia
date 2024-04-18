import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import CustomButton from "../components/customButton";

export default function PermissaoNegadaIntermediario() {
  return (
    <div className="DPPERMNEGINTER">
      <Navbar></Navbar>

      <div className="DFPERMNEGINTER">
        <MenuDireito />


        <div className="DIPERMNEGINTER">
          <div className="DFPIPERMNEGINTER">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco"></img>
            <h1 className="h1MinDoaPERMNEGINTER">Coletar Doação</h1>

            <div className="DFFPERMNEGINTER">
              <img src="/triste.png" className="IcoTris"></img>
              <h1 className="h1NpossuiDoacaoPERMNEGINTER">Parece que você não possui Cadastro ou Permissão.</h1>
              <p className="PSejaPartePERMNEGINTER">Entre agora e seja um intermediario!</p>

              <div className="btnContainerPERMNEGINTER">

                <CustomButton href={"/EntrarIntermediario"} className={"btnEntrarPN"} buttonText={"Entrar"} />
                <CustomButton href={"/CadastrarIntermediario"} className={"btnCadPN"} buttonText={"Cadastrar"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
