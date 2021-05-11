function CreateElement(elementType, elementClass, elementParent, elementInnerHTML, elementStyle) {
    this.elementType = elementType;
    this.elementClass = elementClass;
    this.elementParent = elementParent;
    this.elementInnerHTML = elementInnerHTML;
    this.elementStyle = elementStyle;


    this.createElement = function() {
        let element = document.createElement(this.elementType);
        element.setAttribute('class', this.elementClass);
        if (this.elementInnerHTML) {
            element.innerHTML = this.elementInnerHTML;
        }
        return element;
    };

    this.addStyles = function() {
        let element = this.createElement();
        this.elementStyle.forEach(function (property) {
            let style = Object.keys(property)[0];
            element.style[style] = Object.values(property)[0];
        });
        return element;
    }

    this.addElement = function() {
        let element = this.addStyles();
        document.querySelector(this.elementParent).appendChild(element);
    }
}