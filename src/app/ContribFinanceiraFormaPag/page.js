"use client"
import Navbar from "../components/layoutCadastroLogin";
import Menu from "../components/MenuEmpresa";
import styles from "./style.css";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BackButton, CustomButton } from "../components/customButton";
import Link from "next/link";
import SucErroAddDoacao from "../components/SucErroAddDoacao";

export default function ContribFinanceiraFormaPag() {

    const [categoria, setCategoria] = useState("");

    // Estado para controlar qual botão está ativo
    const [activeButton, setActiveButton] = useState(3);
    const [classificacao, setClassificacao] = useState([]);
    // Função para lidar com o clique do botão
    const handleButtonClick = (button) => {
        // Se o botão clicado for o mesmo que já está ativo, retorna sem fazer nada
        if (button === activeButton) {
            return;
        }

        // Define o botão clicado como ativo
        setActiveButton(button);
    };

    // Efeito para definir o botão "Produtor" como ativo ao carregar a página
    useEffect(() => {
        setActiveButton(3); // Define o botão "Produtor" como ativo
    }, []);


    return (

        <div className="DivPaiFormaPag">
            <Navbar />
            <div className="DivFilhoFormaPag">
                <Menu />

                <div className="DivImagemFormaPag">
                    <div className="DivFundoPaiFormaPag">

                        <BackButton />

                        <h1 className="titulo">Contribuição Financeira</h1>
                        <div className="DivFundoFilhoFormaPag">

                            <div className="posfundoFilhoFormaPag" >
                                <div style={{ display: "flex", alignItens: "center", textAlign: "center" }}>
                                    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", left: "1.6rem" }} className="h1FormaPag">Escolha a forma de pagamento</h1>
                                    <div style={{ marginRight: "1.2rem", marginTop: "1rem" }}>
                                        <img src="./filtrar.png" className="imgFiltrarFormaPag" />
                                        <p >Filtro</p>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "black", height: "2px", width: "100%" }}></div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <a href="#"
                                        className={activeButton === 1 ? 'active btnCardCred' : 'btnCardCred'}
                                        onClick={(e) => {
                                            e.preventDefault(); // Evita que o link seja seguido
                                            handleButtonClick(1);
                                        }} >
                                        <p className="textbtnCardCred">Cartão de Crédito</p>
                                    </a>
                                    <a href="#"
                                        className={activeButton === 2 ? 'active btnCardDebt' : 'btnCardDebt'}
                                        onClick={(e) => {
                                            e.preventDefault(); // Evita que o link seja seguido
                                            handleButtonClick(2);
                                        }}>
                                        <p className="textbtnCardDebt">Cartão de Débito</p>
                                    </a>
                                    <a href="#"
                                        className={activeButton === 3 ? 'active btnPix' : 'btnPix'}
                                        onClick={(e) => {
                                            e.preventDefault(); // Evita que o link seja seguido
                                            handleButtonClick(3);
                                        }} >
                                        <p className="textbtnPix">Pix</p>
                                    </a>
                                    <a href="#"
                                        className={activeButton === 4 ? 'active btnBoleto' : 'btnBoleto'}
                                        onClick={(e) => {
                                            e.preventDefault(); // Evita que o link seja seguido
                                            handleButtonClick(4);
                                        }}>
                                        <p className="textbtnBoleto">Boleto</p>
                                    </a>
                                </div>

                                <form className="FormPix" style={{ display: activeButton === 3 ? 'block' : 'none' }}>
                                    <div className="DadosFinanc" style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.8rem", fontSize: "1.1rem", marginBottom: "1.8rem", fontWeight: "bold" }}>Enviar com Pix</p>
                                    </div>
                                    <div style={{ width: "75%", margin: "0 auto" }}>

                                        <label>
                                            Nome do Contribuinte:
                                        </label>
                                        <input type="text" name="nome_alimento" className="form-control"
                                            placeholder="Digite seu nome ou da empresa..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)}*/ />

                                    </div>
                                    <div style={{ width: "75%", margin: "0 auto", marginTop: "1.5rem" }}>

                                        <label>
                                            CPF/CNPJ do contribuinte
                                        </label>
                                        <input type="text" name="nome_alimento" className="form-control"
                                            placeholder="Digite seu CPF ou CNPJ da empresa..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)}*/ />

                                    </div>
                                    <div style={{ width: "75%", margin: "0 auto", marginTop: "1.5rem" }}>

                                        <label>
                                            Valor de envio
                                        </label>
                                        <input type="text" name="nome_alimento" className="form-control"
                                            placeholder="Digite o valor à ser enviado..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)}*/ />

                                    </div>
                                    <Link href="/ContribFinanceiraEnviarPix">
                                        <button className="btnEnvi" type='submit'>Enviar</button>
                                    </Link>
                                </form>

                                <form className="FormBoleto" style={{ display: activeButton === 4 ? 'block' : 'none' }}>
                                    <div className="DadosFinanc" style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.8rem", fontSize: "1.1rem", marginBottom: "1.8rem", fontWeight: "bold" }}>Enviar com Boleto</p>
                                    </div>
                                    <div style={{ width: "75%", margin: "0 auto" }}>

                                        <label>
                                            Nome do Contribuinte:
                                        </label>
                                        <input type="text" name="nome_alimento" className="form-control"
                                            placeholder="Digite seu nome ou da empresa..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)}*/ />

                                    </div>
                                    <div style={{ width: "75%", margin: "0 auto", marginTop: "1.5rem" }}>

                                        <label>
                                            CPF/CNPJ do contribuinte
                                        </label>
                                        <input type="text" name="nome_alimento" className="form-control"
                                            placeholder="Digite seu CPF ou CNPJ da empresa..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)}*/ />

                                    </div>
                                    <div style={{ width: "75%", margin: "0 auto", marginTop: "1.5rem" }}>

                                        <label>
                                            Valor de envio
                                        </label>
                                        <input type="text" name="nome_alimento" className="form-control"
                                            placeholder="Digite o valor à ser enviado..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)}*/ />

                                    </div>
                                    <Link href="/ContribFinanceiraEnviarBoleto">
                                        <button className="btnEnvi" type='submit'>Enviar</button>
                                    </Link>
                                </form>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
};

/*{erroCadastro && <SucErroAddDoacao ErroAddDoa={erroCadastro} />}

            {succesCadastro && <SucErroAddDoacao SuccessAddDoa={succesCadastro} />}*/

/*<div className="faixaEsquerda"></div>
  <div className="faixaDireita"></div>
*/


/*
<div style={{ display: "flex", flexDirection: "row", marginTop: "2rem", justifyContent: "center", gap: "2rem" }}>

                                    <div className={`CartaoCredito button ${activeButton === 'CartaoCredito' ? 'active' : ''}`} onClick={() => handleButtonClick('CartaoCredito')}
                                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                                            <img src="/IconCartao.png" style={{ width: "4.5rem" }}></img>
                                        </div>
                                        <p style={{ display: "flex", justifyContent: "center" }}>Cartão de Crédito</p>
                                    </div>

                                    <div className={`CartaoDebito button ${activeButton === 'CartaoDebito' ? 'active' : ''}`} onClick={() => handleButtonClick('CartaoDebito')}
                                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                                            <img src="/IconCartao.png" style={{ width: "4.5rem" }}></img>
                                        </div>
                                        <p style={{ display: "flex", justifyContent: "center" }}>Cartão de Débito</p>
                                    </div>

                                    <div className={`Boleto button ${activeButton === 'Boleto' ? 'active' : ''}`} onClick={() => handleButtonClick('Boleto')}
                                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                                            <img src="/IconCodeBar.png" style={{ width: "5rem" }}></img>
                                        </div>
                                        <p style={{ display: "flex", justifyContent: "center", marginTop: "0.3rem" }}>Boleto</p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>

                                    <div className={`Pix button ${activeButton === 'Pix' ? 'active' : ''}`} onClick={() => handleButtonClick('Pix')}
                                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                        <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                                            <img src="/IconPix.png" style={{ width: "4.5rem" }}></img>
                                        </div>
                                        <p style={{ display: "flex", justifyContent: "center" }}>Pix</p>
                                    </div>
                                </div>
*/






/*
<form>
                                    <div className="DadosFinanc" style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.8rem", fontSize: "1.2rem", marginBottom: "1.8rem", fontWeight: "bold" }}>Dados Fianceiros</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "8%" }}>
                                        <div style={{}}>
                                            <label>
                                                Nome da Empresa:
                                            </label>
                                            <input type="text" name="nome_alimento" className="form-control"
                                                placeholder="Digite o nome do produto..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="categoriaLabel">
                                                Categoria:
                                            </label>

                                            <div class="form-control">
                                                <select name="categoria" className="catego" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                                    <option value="">Selecione a categoria...</option>
                                                    <option value="fruta">Pix</option>
                                                    <option value="tuberculo">Transferência Bancária</option>
                                                    <option value="hortalicia">Cartão de Crédito</option>
                                                    <option value="marmita">Cartão de Débito</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DadosFinanc" style={{ display: "flex", justifyContent: "center" }}>
                                        <p style={{ marginTop: "1.8rem", fontSize: "1.2rem", marginBottom: "1.8rem", fontWeight: "bold" }}>Valor de Envio</p>
                                    </div>
                                    <div className="valorEnvio">
                                        <div style={{ marginLeft: "5%" }}>
                                            <p>Nome do Intermediário</p>
                                            <p>-Nome do Intermediário-</p>
                                        </div>
                                        <div className="campoValor">
                                            <div className="poscampoValor" style={{}}>
                                                <label>
                                                    Digite o valor de envio:
                                                </label>
                                                <input type="text" name="nome_alimento" className="form-control"
                                                    placeholder="Digite o valor..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btnEnvi" type='submit'>Enviar</button>

                                </form>
*/