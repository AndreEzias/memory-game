import Image from "./Image.js"

class Card {
    backImagePath = '/images/card_back_red.png'
    image = null
    element = null

    constructor(frontImagePath) {
        this.element = document.createElement('div')
        this.image = document.createElement('img')
        this.element.classList.add('Card')
        this.element.classList.add('col-3')
        this.element.classList.add('my-2')

        const flipper = document.createElement('div')
        flipper.classList.add('flipper')

        const frontImage = new Image({ src: frontImagePath, alt: 'Card Front' })
        frontImage.classList.add('card-front')

        const backImage = new Image({ src: this.backImagePath, alt: 'Card Back'})
        backImage.classList.add('card-back')

        flipper.appendChild(backImage)
        flipper.appendChild(frontImage)

        this.appendChild(flipper)

        this.addClickListener(() => {
            this.flipCard()
            this.element.dispatchEvent(new Event('flip'))
        })
    }

   
    addClass(className) {
        this.element.classList.add(className)
    }
   
    removeClass(className) {
        this.element.classList.remove(className)
    }
   
    appendChild(child) {
        this.element.appendChild(child)
    }
   
    removeChild(child) {
        this.element.removeChild(child)
    }
   
    flipCard() {
        const isMatched = this.isMatched()

        if (isMatched) {
            return
        }

        this.element.classList.toggle('card--flipped')
    }

    matchCard(card) {
        if (this.frontImage === card.frontImage) {
            this.element.classList.add('card--matched')
        }
    }

    isMatched() {
        return this.element.classList.contains('card--matched')
    }

    isFliped() {
        return this.element.classList.contains('card--flipped')
    }

    addClickListener(callback) {
        this.element.addEventListener('click', () => callback())
    }
    addFlipListener(callback) {
        this.element.addEventListener('flip', () => callback())
    }

    get frontImage() {
        return this.element.querySelector('.card-front').src
    }
}
    

export default Card