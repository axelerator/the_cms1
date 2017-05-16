class BoxProperty {
  constructor() {
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
    this.unit = 'px';
  }

  cssPropertyName() {
    throw 'must be overwritten in child class';
  }

  toCss() {
    return `border: ${this.top}${this.unit} ${this.right}${this.unit} ${this.bottom}${this.unit} ${this.left}${this.unit} `
  }
}

class Border extends BoxProperty {
  cssPropertyName() { return 'border';}
}

export class SectionElement {
  constructor() {
    this.cssProperties = [];
    this.cssProperties.push();
  }
}

export class Page {
  constructor() {
    this.elements = [];
    this.elements.push(new SectionElement());
  }
}

