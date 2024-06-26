"use client"
import Navbar from "../components/layoutCadastroLogin";
import Menu from "../components/MenuEmpresa";
import "./style.css";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BackButton, CustomButton } from "../components/customButton";
import Link from "next/link";
import SucErroAddDoacao from "../components/SucErroAddDoacao";

export default function ContribFinanceiraInserirDados() {

    const [categoria, setCategoria] = useState("");

    return (

        <div className="DivPai">
            <Navbar />
            <div className="DivFilho">
                <Menu />

                <div className="DivImagem">
                    <div className="DivFundoPai">

                        <BackButton />

                        <h1 className="titulo">Contribuição Financeira</h1>
                        <div className="DivFundoFilho">
                            <div className="faixaEsquerda"></div>
                            <div className="faixaDireita"></div>
                            <div className="posfundoFilho" >

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
                                        onChange={(e) => setNome(e.target.value)}*/ />
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
                                        onChange={(e) => setNome(e.target.value)}*/ />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btnEnvi" type='submit'>Enviar</button>

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