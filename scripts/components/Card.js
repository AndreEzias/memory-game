import Image from "./Image.js"

class Card {
    backImagePath = 'images/card_back_red.png'
    element = null
    flipEvent = null

    constructor(frontImagePath) {
        this.build(frontImagePath)
        this.addClickListener(() => this.flipCard())
        this.flipEvent = new Event('flip')
    }

    build(frontImagePath) {
        this.element = document.createElement('div')
        this.element.classList.add('Card','col-3','my-2')

        const flipper = document.createElement('div')
        flipper.classList.add('flipper')

        const frontImage = new Image({ src: frontImagePath, alt: 'Card Front' })
        frontImage.classList.add('card-front')

        const backImage = new Image({ src: this.backImagePath, alt: 'Card Back' })
        backImage.classList.add('card-back')

        flipper.appendChild(backImage)
        flipper.appendChild(frontImage)

        this.appendChild(flipper)
    }

    appendChild(child) {
        this.element.appendChild(child)
    }

    removeChild(child) {
        this.element.removeChild(child)
    }

    flipCard() {

        if (this.isMatched) {
            return
        }

        this.element.classList.toggle('card--flipped')

        if (this.isFliped) {
            this.element.dispatchEvent(this.flipEvent)
        }
    }

    setMatched(status = true) {
        if (status) {
            this.element.classList.add('card--matched')
        } else {
            this.element.classList.remove('card--matched')
        }
    }

    flipToFront() {
        this.element.classList.add('card--flipped')
        if (!this.isFliped) {
        }
    }

    flipToBack() {
        if (this.isFliped) {
            this.element.classList.remove('card--flipped')
        }
    }

    get isMatched() {
        return this.element.classList.contains('card--matched')
    }

    get isFliped() {
        return this.element.classList.contains('card--flipped')
    }

    get frontImage() {
        return this.element.querySelector('.card-front').src
    }

    addClickListener(callback) {
        this.element.addEventListener('click', () => callback())
    }
    addFlipListener(callback) {
        this.element.addEventListener('flip', () => callback())
    }
}


export default Card