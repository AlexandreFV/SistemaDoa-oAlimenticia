
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';


export default function modalValorPagamento({idStripe, userEmpresaId}){
    const [valor, setValor] = useState();
    const token = localStorage.getItem("token");
    const stripePromise = loadStripe('pk_test_51PCbkzB0I0kVCHBEihpetEBp7kXq1YVpTKrS6bXZYxRlH354snfCHDaGO4C4hV792xqpN0KeDmOmnSJsOZOLcZdw00oLulsgGR'); // Substitua pelo seu publishable key

    const RealizarDoacao = async () => {
        try{
        const response = await fetch(`http://localhost:3001/RealizarDoacao/${idStripe}`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
                valor: valor,
                userId: userEmpresaId,
            }),
        })

        if (response.ok){

            const { sessionId } = await response.json();
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId });
        }else {
            console.error('Erro ao criar sessão de checkout:', response.statusText);
        }

        }catch(error){
            console.error('Erro na requisição:', error);

        }
    }
    return(

        <div class="modal fade modalPagamento" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h5ModalPagamento" id="exampleModalLongTitle">Enviar Pagamento</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <label>Digite o valor desejado para doação</label>
        <br ></br>
        <input class="form-control"
              name="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)} // Atualiza o estado com o valor do input
            />

      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-dismiss="modal">Close</button>
        <button onClick={RealizarDoacao} class="btn btn-primary">Confirmar</button> {/* Chama a função RealizarDoacao ao clicar */}
      </div>
    </div>
  </div>
</div>

    )
    
}