
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

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <label>Digite o valor desejado para doação</label>
        <input
              name="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)} // Atualiza o estado com o valor do input
            />
            <button onClick={RealizarDoacao}>Confirmar</button> {/* Chama a função RealizarDoacao ao clicar */}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    )
    
}