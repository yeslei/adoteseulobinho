document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector(".content");
    const search = document.querySelector("input[type='search']");
    const checkbox = document.querySelector("#adotadosCheckbox");

    let items = [];

    function addHTML(lobinho, num) {
        var classAdotar = `<a href="showlobinho.html?id=${lobinho.id}" class="botaoAdotar">Adotar</a>`
        if (lobinho.adotado) {
            classAdotar = `<button onclick="alert('Já está adotado')" class="botaoAdotado">Adotado</a>`
            
        }
        
        const reverseClass = num % 2 === 0 ? "" : "lobo-reverse";
        
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="lobo ${reverseClass}">
                <div class="imagemLobo">
                    <img src="${lobinho.imagem}">
                </div>
                <div class="dadosDoLobo">
                    <div>
                        <h1>${lobinho.nome}</h1>
                        ${classAdotar}
                    </div>
                    <p>${lobinho.descricao}</p>
                </div>
            </div>`;
        content.append(div);
    }

    const fetchConfig = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch("http://localhost:3000/lobinhos", fetchConfig)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return resposta.json();
        })
        .then((lobinhos) => {
            lobinhos.forEach((lobinho, index) => {
                addHTML(lobinho, index);
                items.push(lobinho);
            });
        })
        .catch((error) => {
            console.error('Erro ao buscar lobinhos:', error);
        });

    function updateContent() {
        content.innerHTML = "";
        let filteredItems = items;

        if (checkbox.checked) {
            filteredItems = items.filter(item => item.adotado);
        }

        filteredItems
            .filter(item => item.nome.toLowerCase().includes(search.value.toLowerCase()))
            .forEach((item, index) => addHTML(item, index));
    }

    search.oninput = updateContent;
    checkbox.addEventListener('change', updateContent);
});
