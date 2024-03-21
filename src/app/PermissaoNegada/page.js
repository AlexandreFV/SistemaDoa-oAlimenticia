import Navbar from "../components/layoutCadastroLogin";
import "./style.css";
import MenuDireito from "../components/menuDoador";
import CustomButton from "../components/customButton";

export default function PermissaoNegada() {
  return (
    <div className="DivPai">
      <Navbar></Navbar>

      <div className="DivFilho">
        <MenuDireito />


        <div className="DivImagem">
          <div className="DivFundoPai">
            <img src="/iconbtnvoltar.png" alt="Ícone de voltar" className="VoltarIco"></img>
            <h1 className="h1MinDoa">Minhas doações</h1>

            <div className="DivFundoFilho">
              <img src="/triste.png" className="IcoTris"></img>
              <h1 className="h1NpossuiDoacao">Parece que você não possui Cadastro ou Permissão.</h1>
              <p className="PSejaParte">Entre agora e seja um DOADOR!</p>

              <div className="btnContainer">

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
