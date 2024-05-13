import React from 'react';

export default function ModalValidarCadastro({ showModal, onClose }) {
    return (
        <>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Validação de Cadastro</h2>
                        <p>
                            Para verificar se as informações de cadastro foram validadas,
                            acesse <a href="link_para_dashboard_do_stripe">aqui</a> ou
                            acesse a aba "Meu Perfil" na barra de navegação.
                        </p>
                        <button onClick={onClose}>Fechar</button>
                    </div>
                </div>
            )}
        </>
    );
}
