import uuidV4 from 'uuid/v4';
import camelize from 'camelize';

export class BoxProperty {
  constructor() {
    this.top = 0;
    this.right = 0;
    this.bottom = 1;
    this.left = 0;
    this.unit = 'px';
  }

  cssPropertyName() {
    throw 'must be overwritten in child class';
  }

  reactCssName() {
    return camelize(this.cssPropertyName());
  }

  cssValue() {
    return `${this.top}${this.unit} ${this.right}${this.unit} ${this.bottom}${this.unit} ${this.left}${this.unit} `
  }

  toCss() {
    return `${this.cssPropertyName()}: ${this.cssValue()}`
  }
}

class BorderWidth extends BoxProperty {
  cssPropertyName() { return 'border-width';}
}

export class SectionElement {
  constructor() {
    this.id = uuidV4();
    this.cssProperties = [];
    this.cssProperties.push(new BorderWidth());
  }
}

export class Page {
  constructor() {
    this.elements = [];
    this.name = 'new page';
    this.elements.push(new SectionElement());
  }

  updateName(newName) {
    const clone = this.clone();
    clone.name = newName;
    return clone;
  }

  clone() {
    const newPage = new Page();
    newPage.elements = this.elements;
    newPage.name = this.name;
    return newPage;
  }
}

