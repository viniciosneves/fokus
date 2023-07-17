/**
 * Rascunho da ementa
 * document
 * querySelector
 * querySelectorAll
 * tipos de seletores (tag, classe e id)
 * data-* attributes
 * setAttribute
 * innerHTML
 * textContent
 * toLocaleTimeString
 * 
 * atenção ao falar de JS, usar "relembrar"
 * 
 * let, var e const
 * interpolação de string com `${}`
 * setInterval   (Event Loop) - para saber mais
 * clearInterval (Event Loop) - para saber mais
 * arrow function / function normal
 * addEventListener
 * 
 * performance | boas práticas nos seletores *** para saber mais
 * 
 * ATENÇÃO: use nomes de variáveis e funções que você costuma usar nos seus cursos
 * 
 */


const focoBtn = document.querySelector('.app__card-button--foco')
const shortBtn = document.querySelector('.app__card-button--short')
const longBtn = document.querySelector('.app__card-button--long')
const html = document.querySelector("html")

const banner = document.querySelector(".app__section-banner-container .app__image")

const timer = document.querySelector("#timer")
const startPauseBtn = document.querySelector("#start-pause")
const startPauseBtnText = document.querySelector("#start-pause span")
const startPauseBtnIcon = document.querySelector(".app__card-primary-butto-icon")

const buttons = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');


const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true


let intervaloId = null;
let tempoDecorridoEmSegundos = 25; // trabalhar em segundos pra ver tudo acontecendo na tela
//let tempoDecorridoEmSegundos = 25 * 60; -> quando finalizar, fala pro aluno lembrar de multiplicar por 60 pra ter a quantidade de minutos em segundos
mostrarTempo()

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto)
    // quando trocamos, zeramos nosso timer e atualizamos o mostrador
    zerar()
    mostrarTempo()
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });
}

focoBtn.addEventListener("click", () => {
    // o mesmo que trocar para short break, mas com tempo diferente
    tempoDecorridoEmSegundos = 25;
    alterarContexto("foco")
    focoBtn.classList.add('active')
})

shortBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 5;
    // tempoDecorridoEmSegundos = 5 * 60; -> quando finalizar, fala pro aluno lembrar de multiplicar por 60 pra ter a quantidade de minutos em segundos
    alterarContexto("short-break")
    shortBtn.classList.add('active')
})

longBtn.addEventListener("click", () => { // desafio?
    // o mesmo que trocar para short break, mas com tempo diferente
    tempoDecorridoEmSegundos = 15;
    alterarContexto("long-break")
    longBtn.classList.add('active')
})

startPauseBtn.addEventListener("click", iniciarOuPausar)

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        alert('acabou')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        return // early return -- circuit breaker
    }
    audioPlay.play();
    startPauseBtnText.textContent = "Pausar"
    startPauseBtnIcon.setAttribute('src', `/imagens/pause.png`)
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    audioPause.play();
    clearInterval(intervaloId)
    startPauseBtnIcon.setAttribute('src', `/imagens/play_arrow.png`)
    startPauseBtnText.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo() {
    const data = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = data.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    timer.innerHTML = `${tempoFormatado}`
}