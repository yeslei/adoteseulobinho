function postLobo() {
    let nome = document.querySelector("#nome_lobo").value;
    let idade = document.querySelector("#idade_lobo").value;
    let imagem = document.querySelector("#link_lobo").value;
    let descricao = document.querySelector("#descricao_lobo").value;

    fetch("http://localhost:3000/lobinhos")
        .then((resposta) => {
            return resposta.json();
        })
        .then((lobinhos) => {
        
            let id = lobinhos.length + 1;

            let fetchBody = {
                "id": id.toString(),
                "nome": nome,
                "idade": idade,
                "descricao": descricao,
                "imagem": imagem,
                "adotado": false,
                "nomeDono": null,
                "idadeDono": null,
                "emailDono": null
            }

            const fetchConfig = {
                "method": "POST",
                "body": JSON.stringify(fetchBody),
                "headers": { "Content-Type": "application/json" }
            }

            return fetch("http://localhost:3000/lobinhos", fetchConfig);
        })
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error('Erro na resposta da rede');
            }
            return resposta.json();
        })
        .then((resposta) => {
            console.log(resposta);
            alert("Lobo adicionado!");
        })
        .catch((error) => {
            console.log(error);
        });
}

let botaoSalvar = document.querySelector(".save");
botaoSalvar.addEventListener("click", postLobo);