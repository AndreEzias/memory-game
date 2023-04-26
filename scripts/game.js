import Card from "./components/Card.js";
import apiImages from "./services/api-images.js";
import Counter from "./components/Counter.js";
import StartingTime from "./components/StartingTime.js";

class Game {
    
    constructor(element) {
        this.element = element;
        this.score = new Counter(document.querySelector('#score'));
        this.attempts = new Counter(document.querySelector('#attempts'));
        this.startingTime = new StartingTime(document.querySelector('#startingTimer'));
        this.loseEvent = new Event('lose');
        this.winEvent = new Event('win');
        this.startingTime.hide();
    }

    score= null;
    attempts = null
    cards = []
    element = null
    imageService = apiImages
    quantidade = null
    tema = null

    listenWinEvent(callback) {
        this.element.addEventListener('win', callback)
    }

    listenLoseEvent(callback) {
        this.element.addEventListener('lose', callback)
    }

    start(quantidade, tema) {
        this.quantidade = quantidade
        this.tema = tema
        this.removeCards()
        this.populateCards()

        this.startingTime.show()
        this.startingTime.countdown(quantidade)

        this.startingTime.listenEndEvent(() => {
            this.flipAllCardToBack()
            this.startingTime.hide()
        })
        
        this.score.reset()
        this.attempts.set(quantidade)
    }

    populateCards() {
        const cards = []
        
        apiImages.getImages(this.tema, this.quantidade).then(images => {
            images.photos.forEach(image => {
                const src = image.src.portrait
                const card1 = new Card(src)
                const card2 = new Card(src)
                card1.flipToFront()
                card2.flipToFront()
                cards.push(card1)
                cards.push(card2)
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
            if (card.isFliped && !card.isMatched) {
                card.flipToBack()
            }
        })
    }

    flipAllCardToBack() {
        this.cards.forEach(card => {
            card.flipToBack()
        })
    }
    
    getCardsFliped() {
        return this.cards.filter(card => card.isFliped && !card.isMatched)
    }

    randomizeCards(cards) {
        return cards.sort(() => Math.random() - 0.5)
    }

    // listen a flip event on each card
    listenFlipEvent() {
        this.cards.forEach(card => {
            card.addFlipListener(() => {
                const flipeds = this.getCardsFliped()

                if (flipeds.length > 2) {
                    this.flipAllCards()
                    this.attempts.sub(1)
                    return
                }

                if (flipeds.length === 2) {
                    const [ firstCard, secondCard ] = flipeds
                    if (firstCard.frontImage === secondCard.frontImage) {
                        firstCard.setMatched(true)
                        secondCard.setMatched(true)
                        this.score.add(1)
                        this.attempts.add(2)
                    } else {
                        this.attempts.sub(1)
                    }

                    setTimeout(() => this.flipAllCards(), 1000)
                }


                this.attempts.get() === 0
                    ? this.element.dispatchEvent(this.loseEvent)
                    : null

                this.score.get() == this.quantidade 
                    ? this.element.dispatchEvent(this.winEvent) 
                    : null
            })
        })
    }

    removeCards() {
        this.element.innerHTML = ''
    }
}

export default Game
