const urlParams = new URLSearchParams(window.location.search);
const idDoLobo = urlParams.get('id');

if (idDoLobo) {
    console.log('ID do lobo:', idDoLobo);

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
                const loboNomeElement = document.getElementById('titulo');
                const imagemLoboElement = document.querySelector('.lobo');
                const paragrafo= document.getElementById('paragrafo2');
                const adotarLinkElement = document.querySelector('.adotar-link');

                if (loboNomeElement && imagemLoboElement) {
                    loboNomeElement.textContent = `${lobo.nome}`;
                    imagemLoboElement.src = lobo.imagem;
                    paragrafo.textContent = `${lobo.descricao}`;
                    adotarLinkElement.href = `adotelobo.html?id=${lobo.id}`;
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

function deletar() {


    const urlParams = new URLSearchParams(window.location.search);
    const idDoLobo = urlParams.get('id');

    if (idDoLobo) {

        fetch(`http://localhost:3000/lobinhos/${idDoLobo}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            alert("Lobo removido!")
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    } else {
        console.error('Parâmetro "id" não encontrado na URL.');
    }
}