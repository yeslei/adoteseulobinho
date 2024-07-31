document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector(".content");
    const search = document.querySelector("input[type='search']");
    const checkbox = document.querySelector("#adotadosCheckbox");
    const pagination = document.querySelector(".pagination");

    let items = [];
    let currentPage = 1;
    const itemsPerPage = 4;

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
            items = lobinhos;
            updateContent();
        })
        .catch((error) => {
            console.error('Erro ao buscar lobinhos:', error);
        });

    function updateContent() {
        content.innerHTML = "";
        let filteredItems = items;

        if (checkbox.checked) {
            filteredItems = items.filter(item => item.adotado);
        } else {
            filteredItems = items.filter(item => !item.adotado);
        }

        filteredItems = filteredItems.filter(item => item.nome.toLowerCase().includes(search.value.toLowerCase()));

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, endIndex);

        paginatedItems.forEach((item, index) => addHTML(item, index));

        updatePagination(filteredItems.length);
    }

    function updatePagination(totalItems) {
        pagination.innerHTML = "";
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }


        const firstButton = document.createElement("button");
        firstButton.textContent = "<<";
        firstButton.classList.add("page-button");
        firstButton.addEventListener("click", () => {
            currentPage = 1;
            updateContent();
        });
        pagination.append(firstButton);

        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("page-button");
            if (i === currentPage) {
                button.classList.add("active");
            }
            button.addEventListener("click", () => {
                currentPage = i;
                updateContent();
            });
            pagination.append(button);
        }


        const lastButton = document.createElement("button");
        lastButton.textContent = ">>";
        lastButton.classList.add("page-button");
        lastButton.addEventListener("click", () => {
            currentPage = totalPages;
            updateContent();
        });
        pagination.append(lastButton);
    }

    search.oninput = updateContent;
    checkbox.addEventListener('change', updateContent);
});