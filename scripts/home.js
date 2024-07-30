const fetchConfig = {
    method: 'GET'
}

function updateLoboReversed(foto, nome, idade, descricao) {
    let imglobo = document.querySelector('.loboRev');
    let nomelobo = document.querySelector('#nomeDoLoboReverse');
    let idadelobo = document.querySelector('#idadeReverse');
    let descricaolobo = document.querySelector('.paragrafoReverse');

    imglobo.src = foto;
    nomelobo.innerText = nome;
    idadelobo.innerText = `Idade: ${idade} anos`;
    descricaolobo.innerText = descricao;
}
function updateLobo(foto, nome, idade, descricao, isReversed = false) {
        let imglobo = document.querySelector(isReversed ? '.invertido .lobo' : '.lobo:not(.invertido)');
        let nomelobo = document.querySelector(isReversed ? '.invertido .quartaSectionTexto h3' : '.quartaSectionTexto h3');
        let idadelobo = document.querySelector(isReversed ? '.invertido .quartaSectionTexto h4' : '.quartaSectionTexto h4');
        let descricaolobo = document.querySelector(isReversed ? '.invertido .quartaSectionTexto p' : '.quartaSectionTexto p');
    
        if (imglobo) imglobo.src = foto;
        if (nomelobo) nomelobo.innerText = nome;
        if (idadelobo) idadelobo.innerText = `Idade: ${idade} anos`;
        if (descricaolobo) descricaolobo.innerText = descricao;
    }

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



fetch("http://localhost:3000/lobinhos", fetchConfig)
    .then(resposta => resposta.json())
    .then(lobinhos => {
        var lobo_escolhido = randomInt(0, lobinhos.length - 1);
        updateLobo(
            lobinhos[lobo_escolhido].imagem,
            lobinhos[lobo_escolhido].nome,
            lobinhos[lobo_escolhido].idade,
            lobinhos[lobo_escolhido].descricao
        );

        var lobo_escolhido_reverse = randomInt(0, lobinhos.length - 1);
        updateLoboReversed(
            lobinhos[lobo_escolhido_reverse].imagem,
            lobinhos[lobo_escolhido_reverse].nome,
            lobinhos[lobo_escolhido_reverse].idade,
            lobinhos[lobo_escolhido_reverse].descricao
        );
    })
    .catch(error => console.log(error));
