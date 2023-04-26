

class StartingTime {
    constructor(element) {
        this.element = element;
        this.endEvent = new Event('end');
        this.valueEvent = new Event('value');
        this.elementValue = null;
        if (this.element) {
            this.elementValue = this.element.querySelector('.value');
        }
    }

    listenEndEvent(callback) {
        this.element.addEventListener('end', callback);
    }

    listenValueEvent(callback) {
        this.element.addEventListener('value', callback);
    }

    countdown(seconds) {
        clearInterval(this.interval);
        const interval = setInterval(() => {
            this.value = seconds;
            this.elementValue.innerText = seconds;
            seconds--;
            this.element.dispatchEvent(this.valueEvent);
            if (seconds < 0) {
                clearInterval(interval);
                this.element.dispatchEvent(this.endEvent);
            }
        }
        , 1000);
        this.interval = interval;
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

export default StartingTime;
