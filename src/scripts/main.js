document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('converter').addEventListener('click', function () {

        rmvPadraoForm();
        imprimeNome();

        const campoMoeda = document.getElementsByName('radmoed')

        let moeda = '';

        if (campoMoeda[0].checked) {
            moeda = 'EUR-BRL'
        } else if (campoMoeda[1].checked) {
            moeda = 'USD-BRL'
        }
        console.log(moeda)
        const endPoint = `https://economia.awesomeapi.com.br/json/last/${moeda}`
        console.log(endPoint)

        fetch(endPoint).then(function (resposta) {
            return resposta.json()
        })
            .then(function (data) {
                const maximo = data.high;
                console.log(maximo)
            })

    })
})

function rmvPadraoForm() {
    const form = document.getElementById('form').addEventListener('submit', function (evento) {
        evento.preventDefault();
    })
}

function imprimeNome() {
    const nome = document.getElementById('nome').value;
    const campoNome = document.getElementById('adc-nome');
    campoNome.innerHTML = nome
    document.querySelector('.hello').classList.remove('hello--none')
}

