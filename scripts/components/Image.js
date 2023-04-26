class Image {
    constructor(props) {
        this.props = props;
        return this.render();
    }
    
    render() {
        const { src, alt, classList ='' } = this.props;
        this.element = document.createElement('img');
        this.element.src = src;
        this.element.alt = alt;
        this.element.classList.add('img-fluid');
        if (classList) {
            this.element.classList.add(classList);
        }
        return this.element;
    }
}

export default Image;