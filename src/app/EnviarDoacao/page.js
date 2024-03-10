"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EnviarDoacao(){

    const [nome_alimento, setNome] = useState("");
    const [quantidade, setQuant] = useState("");
    const [foto, setFoto] = useState(null); // Alteração aqui: estado para armazenar o arquivo
    const [endereco, setEndereco] = useState("");
    const router = useRouter();


    useEffect(() => {
      const token = localStorage.getItem('token'); // Verifica se há um token no armazenamento local
  
      if (!token) {
        // Se não houver token, redireciona para a página de login
        router.push('/Cadastrar');
      } else {
        // Se houver token, envie uma solicitação para o servidor para obter os detalhes do usuário
        const UserType = localStorage.getItem('userType');
        if(UserType !== 'doador'){
          router.push("/PermissaoNegada");
        } 
      }
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(nome_alimento != "" && quantidade != "" && foto != "" && endereco != ""){
        const usuariodoadorId = localStorage.getItem('userId'); // Recupera o ID do usuário logado armazenado no localStorage

        try {
          const response = await fetch("http://localhost:3001/EnviarDoacao", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação no cabeçalho da requisição
            },
            body: JSON.stringify({
              nome_alimento,
              quantidade,
              foto,
              endereco,
              usuariodoadorId,
            }),
          });
    
          if (response.ok) {
            console.log("Cadastro realizado com sucesso!");
   

          } else {
            const responseData = await response.json();

            console.error("Erro ao enviar doacao:", response.statusText);
            // Exibir uma mensagem de erro aqui
          }
        } catch (error) {
          console.error("Erro ao realizar requisição:", error.message);
          // Exibir uma mensagem de erro aqui
        }
      } else {
        setErroCadastro("Preencha todos os campos!");
      }      
    };

     // Função para lidar com a alteração do campo de arquivo
     const handleFileChange = (event) => {
      const file = event.target.files[0];
      // Atualize o estado 'foto' com o nome do arquivo da imagem selecionada
      setFoto(file.name);
  };
    

    useEffect(() => {
      // Verifica se o usuário é do tipo doador
      const userType = localStorage.getItem('userType'); // Supondo que userType esteja armazenado no localStorage
  
      if (userType !== 'doador') {
        // Se não for doador, redireciona para a página de permissão negada
        router.push('/PermissaoNegada');
      }
    }, []);

    return(
        
        <div>
        <form onSubmit={handleSubmit}>

            <label>Nome do Produto</label>
            <input type="text" name='nome_alimento'
            value={nome_alimento} onChange={(e) => setNome(e.target.value)}></input>

            <label>Quantidade</label>
            <input type="text" name='quantidade'
            value={quantidade} onChange={(e) => setQuant(e.target.value)}></input>

              <label>Foto</label>
                <input
                    type='file'
                    name='foto'
                    onChange={handleFileChange} // Use a função handleFileChange para lidar com a mudança no campo de arquivo
                />
                {/* Exiba o nome do arquivo da imagem selecionada */}
                <p>Nome do Arquivo: {foto}</p>

            <label>Endereço</label>
            <input type='text' name='endereco'
            value={endereco} onChange={(e) => setEndereco(e.target.value)}></input>

            <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}