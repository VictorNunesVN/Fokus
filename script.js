const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iconeBtn = document.querySelector('#start-pause img')
const musicaFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const somPlay = new Audio('sons/play.wav')
const somPause = new Audio('sons/pause.mp3')
const somTerminou = new Audio('sons/beep.mp3')
const startPauseBt = document.querySelector('#start-pause')

musica.loop = true

let tempoDecorridoEmSegundos = 1500 
let intervaloId = null


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    }
    else {
        musica.pause()
    }
}
)

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br> <strong class='app__title-strong'>mergulhe no que importa</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br> <strong class ='app__title-strong'> Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br> <strong class='app__title-strong'>Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somTerminou.play()
        console.log(intervaloId)
        alert('Tempo finalizado!')
        zerar()
        return

    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener('click', () => {
    iniciarOuPausar()
    console.log(intervaloId)
    if (intervaloId) {
        somPlay.play()
    }

})

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play()
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)// cria um temporizador que realiza uma função em um determinado periodo de tempo
    iconeBtn.setAttribute('src', `/imagens/pause.png`)
    iniciarOuPausarBt.innerHTML = 'Pausar'
}

function zerar() {
    clearInterval(intervaloId)
    iconeBtn.setAttribute('src', `/imagens/play_arrow.png`)
    iniciarOuPausarBt.innerHTML = "Começar"
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatato = tempo.toLocaleTimeString('pt-br', {minute:'2-digit',second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatato}`
}
mostrarTempo()
