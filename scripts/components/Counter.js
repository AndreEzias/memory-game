

class Attempts {
    constructor(element) {
        this.element = element;
        this.value = 0;
    }

    update() {
        this.element.innerText = this.value;
    }

    set(value) {
        this.value = parseInt(value); 
        this.update();
    }

    add(value) {
        this.value += value;
        this.update();
    }

    sub(value) {
        this.value -= value;
        this.update();
    }

    get() {
        return this.value;
    }

    reset() {
        this.value = 0;
        this.update();
    }
}

export default Attempts;
