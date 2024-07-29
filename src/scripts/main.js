document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('converter').addEventListener('click', function () {

        rmvPadraoForm();
        imprimeNome();

        const campoMoeda = document.getElementsByName('radmoed')

        let linkmoeda = '';

        if (campoMoeda[0].checked) {
            linkmoeda = 'EUR-BRL'
        } else if (campoMoeda[1].checked) {
            linkmoeda = 'USD-BRL'
        }

        const endPoint = `https://economia.awesomeapi.com.br/json/last/${linkmoeda}`

        fetch(endPoint).then(function (resposta) {
            return resposta.json()
        })
            .then(function (data) {
                //remove o hifen pois para acessar a api é preciso do hifen na url , porém para acessar o json não pode usar hifen. [URL:EUR-BRL] / [Json:EURBRL]
                const moedakey = linkmoeda.replace('-', '')
                //acessa p json ja tratado com a chave sem o hifen (-)
                const dataMoeda = data[moedakey]

                const maximo = Number(parseFloat(dataMoeda.high).toFixed(2));
                const minimo = Number(parseFloat(dataMoeda.low).toFixed(2));
                const compra = Number(parseFloat(dataMoeda.bid).toFixed(2));
                const venda = Number(parseFloat(dataMoeda.ask).toFixed(2));
                const variacao = Number(parseFloat(dataMoeda.varBid).toFixed(2));
                const porcentagemVar = dataMoeda.pctChange;
                const porVar = porcentagemVar.replace('-', ' ')
                const horario = dataMoeda.create_date;
                const name1 = dataMoeda.code;
                const name2 = dataMoeda.codein;

                document.getElementById('max').innerHTML = `R$${maximo}`
                document.getElementById('min').innerHTML = `R$${minimo}`
                document.getElementById('compra').innerHTML = `R$${compra}`
                document.getElementById('venda').innerHTML = `R$${venda}`
                document.getElementById('var').innerHTML = variacao
                document.getElementById('porVar').innerHTML = `${porVar} %`
                document.getElementById('name').innerHTML = ` ${name1} / ${name2}`
                document.getElementById('date').innerHTML = horario
            })
            .catch(function(erro) {
                alert('O sistema esta fora do ar tente novamente!')
                console.log('ocorreu um erro ao fazer a busca com o endPoint')
            })
            .finally(function () {
                document.querySelector('.resultados').classList.remove('resultados--none')
                document.querySelector('.resultados').classList.add('resultados--transicao')
            })
    })
})


function rmvPadraoForm() {
    const form = document.getElementById('form').addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nome = document.getElementById('nome').value

        if (nome.length == 0 ) {
            throw new Error ('Por favor digite seu nome')
        }
    })
}

function imprimeNome() {
    const nome = document.getElementById('nome').value;
    const campoNome = document.getElementById('adc-nome');
    campoNome.innerHTML = nome
    document.querySelector('.hello').classList.remove('hello--none')
}

