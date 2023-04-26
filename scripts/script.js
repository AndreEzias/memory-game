import Game from "./game.js";

const elementGame = document.querySelector('#game')

const game = new Game(elementGame)

const button = document.querySelector('#start')

const superStartButton = document.querySelector('#superStart')

const quantidade = {
    element: document.querySelector('#quantidade'),
    get: function () {
        return quantidade.element.value
    }
}

const tema = {
    element: document.querySelector('#tema'),
    get: function () {
        return tema.element.value
    }
}

const progressBar = {
    element: document.querySelector('.progress'),
    setValueNow: function (value) {
        progressBar.element.setAttribute('aria-valuenow', value)
        progressBar.setPercent(value)
    },
    setMaxValue: function (value) {
        progressBar.element.setAttribute('aria-valuemax', value)
        progressBar.setPercent(value)
    },
    setPercent: function (value) {
        const percent = (value / quantidade.get()) * 100
        progressBar.element.querySelector('.progress-bar').style.width = `${percent}%`
    }
}

const startGame = () => {
    game.start(
        quantidade.get(),
        tema.get()
    )
    progressBar.setMaxValue(quantidade.get())
    progressBar.setValueNow(quantidade.get())
    superStartButton.style.display = 'none'
}


button.addEventListener('click', () => startGame())

const setModalText = (text) => {
    const modal = new bootstrap.Modal(document.querySelector("#messageModal"))
    modal._dialog.querySelector("#messageModalLabel").innerHTML = text
    return modal
}

game.listenWinEvent(() => {
    setModalText("Você ganhou!").show()
    startGame()
})

game.listenLoseEvent(() => {
    setModalText("Você perdeu!").show()
    startGame()
})

game.startingTime.listenValueEvent(() => {
    progressBar.setValueNow(game.startingTime.value)
})

superStartButton.addEventListener('click', () => startGame())