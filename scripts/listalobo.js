const content = document.querySelector(".content");
const search = document.querySelector("input[type='search']");

var items = [];

function addHTML(lobinho, num) {
    var strAdotar = "Adotar";
    if (lobinho.adotado) {
        strAdotar = "Adotado";
    }

    const div = document.createElement("div");
    const reverseClass = num % 2 === 0 ? "lobo-reverse" : "";
    div.innerHTML = `
        <div class="lobo ${reverseClass}">
            <div class="imagemLobo">
                <img src="${lobinho.imagem}">
            </div>
            <div class="dadosDoLobo">
                <div>
                    <h1>${lobinho.nome}</h1>
                    <a href="showlobinho.html?id=${lobinho.id}" class="botaoAdotar">${strAdotar}</a>
                </div>
                <p>
                    ${lobinho.descricao}
                </p>
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
    .then((resposta) => resposta.json())
    .then((lobinhos) => {
        let index = 0;
        lobinhos.forEach((lobinho) => {
            if (!lobinho.adotado) {
                addHTML(lobinho, index);
                items.push(lobinho);
                index++;
            }
        });
    });

search.oninput = () => {
    content.innerHTML = "";

    let index = 0;
    items
        .filter((item) =>
            item.nome.toLowerCase().includes(search.value.toLowerCase())
        )
        .forEach((item) => {
            addHTML(item, index);
            index++;
        });
};