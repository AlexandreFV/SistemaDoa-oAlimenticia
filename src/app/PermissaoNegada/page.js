import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import CustomButton from "../components/customButton";

export default function PermissaoNegada() {
  return (
    <div className="DPPERMINEG">
      <Navbar></Navbar>

      <div className="DFPERMINEG">
        <MenuDireito />


        <div className="DIPERMNEG">
          <div className="DFPPERMNEG">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco"></img>
            <h1 className="h1MinDoaPERMNEG">Minhas doações</h1>

            <div className="DFFPERMNEG">
              <img src="/triste.png" className="IcoTris"></img>
              <h1 className="h1NpossuiDoacaoPERMNEG">Parece que você não possui Cadastro ou Permissão.</h1>
              <p className="PSejaPartePERMNEG">Entre agora e seja um DOADOR!</p>

              <div className="btnContainerPERMNEG">

                <CustomButton href={"/EntrarDoador"} className={"btnEntrarPN"} buttonText={"Entrar"} />
                <CustomButton href={"/CadastrarDoador"} className={"btnCadPN"} buttonText={"Cadastrar"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
