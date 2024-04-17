"use client"
import "./style.css";
import Navbar from "../components/layoutCadastroLogin";
import Menu from "../components/menuDoador";
import "./style.css";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BackButton, CustomButton } from "../components/customButton";
import Link from "next/link";
import SucErroAddDoacao from "../components/SucErroAddDoacao";
/*
export default function ContribFinanceiraInserirDados() {

    return (

        <div className="DivPai">
            <Navbar />
            <div className="DivFilho">
                <Menu />

                <div className="DivImagem">
                    <div className="DivFundoPai">

                        <BackButton />

                        <h1 className="titulo">Faça sua doação</h1>
                        <div className="DivFundoFilho">

                            <center>
                                <h1 style={{ paddingTop: "20px" }}>Dados da Doação</h1>
                            </center>
                            <div class="modal-content custom-modal-line"> </div>

                            <form>

                                <div className="coluna1">
                                    <label>
                                        Nome do Produto:
                                    </label>
                                    <input type="text" name="nome_alimento" class="form-control"
                                        placeholder="Digite o nome do produto..." /*value={nome_alimento}
                                        onChange={(e) => setNome(e.target.value)} />

                                    <label className="categoriaLabel">
                                        Categoria:
                                    </label>

                                    <div class="form-group">
                                        <select name="categoria" className="form-control catego" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                            <option value="">Selecione a categoria</option>
                                            <option value="fruta">Fruta</option>
                                            <option value="tuberculo">Tubérculo</option>
                                            <option value="hortalicia">Hortaliça</option>
                                            <option value="marmita">Marmita</option>
                                            <option value="Carnes e Aves">Carnes e Aves</option>
                                            <option value="Peixes e Frutos do Mar">Peixes e Frutos do Mar</option>
                                            <option value="Produtos de Padaria">Produtos de Padaria</option>

                                        </select>
                                    </div>

                                </div>


                                <div className="coluna2">
                                    
                                </div>

                                <button className="btnEnvi" type='submit'>Enviar</button>

                            </form>


                        </div>

                    </div>

                </div>

            </div>
            {erroCadastro && <SucErroAddDoacao ErroAddDoa={erroCadastro} />}

            {succesCadastro && <SucErroAddDoacao SuccessAddDoa={succesCadastro} />}
        </div>
    );
};
*/