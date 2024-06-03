export default function ModalIntegracao({ linkIntegracao }) {
    return (
        <div>
            <div className="modal fade show" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Usuário Não Integrado ao Stripe</h5>
                            <button type="button" className="close" aria-label="Close" onClick={() => window.location.href = "/"}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Para continuar a ação atual, é necessário realizar a integração com o Stripe.
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => window.location.href = linkIntegracao} type="button" className="btn" style={{background:"blue",color:"white"}}>Realizar Integração</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
