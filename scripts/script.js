import Game from "./game.js";

const game = new Game()

const button = document.querySelector('#start')

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

button.addEventListener('click', () => game.start(
    quantidade.get(),
    tema.get()
))
