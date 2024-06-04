import React from 'react';

const ErroCadastro = ({ erro }) => {
    return (
        <center>
            <div class="alert alert-danger" style={{ marginTop: '5px', color: 'red', width: "90%", marginLeft: "5%", marginRight: "5%", height: "100%" }}>{erro}</div>
        </center>
    );
}

export default ErroCadastro;
