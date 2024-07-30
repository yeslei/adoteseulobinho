const urlParams = new URLSearchParams(window.location.search);
const idDoLobo = urlParams.get('id');

if (idDoLobo) {
    console.log('ID do lobo:', idDoLobo);

    // Ajustar a URL para incluir o ID do lobo
    const url = `http://localhost:3000/lobinhos`;
    console.log('URL de requisição:', url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Erro na resposta da rede:', response.status, response.statusText);
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {
            const lobo = data.find(lobo => lobo.id === idDoLobo);
            if (lobo) {
                const loboNomeElement = document.getElementById('adotelobo');
                const imagemLoboElement = document.getElementById('imagemLobo');
                const idLoboElement = document.getElementById('id');


                if (loboNomeElement && imagemLoboElement) {
                    loboNomeElement.textContent = `Adote o(a) ${lobo.nome}`;
                    imagemLoboElement.src = lobo.imagem;
                    idLoboElement.textContent = `ID: ${lobo.id}`;
                } else {
                    console.error('Elementos DOM não encontrados.');
                }
            } else {
                console.error('Lobo não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o JSON:', error);
        });
} else {
    console.error('Parâmetro "id" não encontrado na URL.');
}

function atualizarDados() {
    // Coletar os valores dos campos de entrada
    const nome = document.getElementById('nome_pessoa').value;
    const idade = document.getElementById('idade_pessoa').value;
    const email = document.getElementById('email').value;

    // Criar um objeto com os valores
    const dados = {
        adotado : true,
        nomeDono: nome,
        idadeDono: idade,
        emailDono: email
    };

    // Obter o ID do lobo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idDoLobo = urlParams.get('id');

    if (idDoLobo) {
        // Enviar uma requisição PATCH
        fetch(`http://localhost:3000/lobinhos/${idDoLobo}`, { // Substitua pelo seu endpoint real
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            // Aqui você pode adicionar código para manipular a resposta
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    } else {
        console.error('Parâmetro "id" não encontrado na URL.');
    }
}