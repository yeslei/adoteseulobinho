function postLobo() {
    let nome = document.querySelector("#nome_lobo").value;
    let idade = document.querySelector("#idade_lobo").value;
    let imagem = document.querySelector("#link_lobo").value;
    let descricao = document.querySelector("#descricao_lobo").value;

    if (nome.length > 60 || nome.length < 4 || nome === ""){
        alert("O nome do Lobo deve ter entre 4 e 60 caracteres")
    }
    else if (idade < 0 || idade > 100 || idade == NaN || idade == "") {
        alert("O lobo deve ter entre 0 e 100 anos")
    }
    else if (imagem === "") {
        alert("Você deve enviar um link de imagem.")
    }
    else if (descricao === "" || descricao.length < 10 || descricao.length > 255) {
        alert("Você deve enviar uma descrição entre 10 e 255 caracteres.")
    }
    else {
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
}

let botaoSalvar = document.querySelector(".save");
botaoSalvar.addEventListener("click", postLobo);