import { useEffect, useState } from "react";

export default function ModalExclusao({ id }) {
  const [doacao, setDoacao] = useState(null);

  useEffect(() => {
    const DadosDoacao = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3001/InfoMinhaDoacao/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDoacao(data); // Estou assumindo que o servidor retorna os dados da doação diretamente
          console.log(data);
        } else {
          console.error("Erro ao buscar informações da doação:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar informações da doação:", error.message);
      }
    };

    DadosDoacao();
  }, [id]);

  const DadosDoacao = async () => {
        const token = localStorage.getItem("token");

        try{
            const response = await fetch (`http://localhost:3001/ApagarDoacao/${id}`,{
            method: "DELETE",
             headers: {
              Authorization: `Bearer ${token}`,
            }
            });

            if (response.ok){
                console.log("Doacao Apagada");
                window.location.reload();
            }
        
        } catch (error){

        }
  }

  return (
    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle" style={{textAlign: "center !important"}}>Apagar Doação (Não Pega)</h5>

          </div>
          <div className="modal-body">
            {doacao && (
              <>
                <p>Deseja remover a seguinte doação?</p>
                <p>Nome do alimento: {doacao.nome_alimento}</p>
                <p>Categoria: {doacao.categoria}</p>
                <p>Quantidade: {doacao.quantidade}</p>
                <p>Validade: {doacao.validade && new Date(doacao.validade).toLocaleDateString()}</p>

                {/* Adicione aqui os outros detalhes da doação */}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" style={{backgroundColor:"#007bff",color:"white"}} data-dismiss="modal">Cancelar</button>
            <button type="button" className="btn"  style={{backgroundColor:"#bd2130",color:"white"}} onClick={DadosDoacao}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
