import Card from "./components/Card.js";
import apiImages from "./services/api-images.js";

class Game {
    
    constructor() {
        this.element = document.querySelector('#game');
    }

    cards = []
    element = null
    imageService = apiImages
    quantidade = null
    tema = null

    start(quantidade, tema) {
        this.element = document.querySelector('#game');
        this.quantidade = quantidade
        this.tema = tema
        this.removeCards()
        this.populateCards()
        this.resetScore()
    }

    populateCards() {
        const images = []
        const cards = []
        
        this.imageService.getImages(this.tema, this.quantidade).then(images => {
            images.photos.forEach(image => {
                const src = image.src.portrait
                cards.push(new Card(src))
                cards.push(new Card(src))
            })
            this.cards = this.randomizeCards(cards)
            this.appendChildCards();
            this.listenFlipEvent();
        })
    }
    
    appendChildCards() {
        this.cards.forEach(card => {
            this.appendChild(card.element);
        });
    }

    // create a method to add a child to the element
    appendChild(child) {
        this.element.appendChild(child)
    }

    // create a method to flip all cards
    flipAllCards() {
        this.cards.forEach(card => {
            if (card.isFliped() && !card.isMatched()) {
                card.flipCard()
            }
        })
    }

    // create a method to check if 2 cards are flipped
    checkIfTwoCardsAreFlipped() {
        const flipeds = this.cards.filter(card => card.isFliped() && !card.isMatched())
        const [ firstCard, secondCard ] = flipeds
        if (flipeds.length > 2) {
            this.flipAllCards()
        }

        if (flipeds.length === 2) {
            if (firstCard.frontImage === secondCard.frontImage) {
                firstCard.addClass('card--matched')
                secondCard.addClass('card--matched')
                this.updateScore()
            } else {
                setTimeout(() => {
                    this.flipAllCards()
                }, 1000)
            }
        }
    }

    randomizeCards(cards) {
        return cards.sort(() => Math.random() - 0.5)
    }

    // listen a flip event on each card
    listenFlipEvent() {
        this.cards.forEach(card => {
            card.addFlipListener(() => this.checkIfTwoCardsAreFlipped())
        })
    }

    // create a method to remove cards
    removeCards() {
        this.element.innerHTML = ''
    }

    updateScore() {
        const score = this.cards.filter(card => card.isMatched()).length
        const scoreElement = document.querySelector('#score')
        scoreElement.innerHTML = score / 2
    }

    resetScore() {
        const scoreElement = document.querySelector('#score')
        scoreElement.innerHTML = 0
    }

    getScore() {
        return document.querySelector('#score').innerHTML
    }
}

export default Game