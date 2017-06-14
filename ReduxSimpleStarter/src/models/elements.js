import _ from 'lodash';
import uuidV4 from 'uuid/v4';
import camelize from 'camelize';

export const SerializableClasses = {};

export class CssProperty {
  constructor(element) {
    this.element = element;
    this.id = uuidV4();
  }

  cssPropertyName() {
    throw 'must be overwritten in child class';
  }

  reactCssName() {
    return camelize(this.cssPropertyName());
  }

  toCss() {
    return `${this.cssPropertyName()}: ${this.cssValue()}`
  }

  update(value) {
    this.value = value;
  }

  clone() {
    const copy = this.constructor(this.element);
    Object.assign(copy, this);
    return copy;
  }

  toStorage() {
    return {
      propertyType: this.constructor.name,
      id: this.id,
      value: this.value
    };
  }

  static fromStorage(element, plain) {
    const factory = {
      ColorProperty: ColorProperty,
      BorderWidth: BorderWidth
    };
    const inst = new (factory[plain.propertyType])(element);
    inst.id = plain.id;
    inst.value = plain.value;
    return inst;
  }
}

export class BoxProperty extends CssProperty {
  constructor(element) {
    super(element);
    this.value = {
      top: 0,
      right: 0,
      bottom: 1,
      left: 0,
      unit: 'px'
    }
  }

  cssValue() {
    return `${this.value.top}${this.value.unit} ${this.value.right}${this.value.unit} ${this.value.bottom}${this.value.unit} ${this.value.left}${this.value.unit} `
  }
}

export class ColorProperty extends CssProperty {
  constructor(element) {
    super(element);
    this.value = 'black'
  }
  cssPropertyName() { return 'color';}
  cssValue() { return this.value; }
}

class BorderWidth extends BoxProperty {
  cssPropertyName() { return 'border-width';}
}

export class SectionElement {
  constructor(page) {
    this.page = page;
    this.id = uuidV4();
    this.cssProperties = [];
    this.cssProperties.push(new BorderWidth(this));
    this.cssProperties.push(new ColorProperty(this));
  }

  toStorage() {
    return {
      elementType: this.constructor.name,
      id: this.id,
      properties: _.map(this.cssProperties, (p) => p.toStorage())
    };
  }

  initFromStorage() {
    // override in subclass to restor subclass specific
    // data
  }

  static fromStorage(page, plain) {
    const factory = {
      SectionElement: SectionElement,
      ColumnsElement: ColumnsElement,
      PlainTextElement: PlainTextElement
    };
    const inst = new factory[plain.elementType](page);
    inst.id = plain.id;
    inst.initFromStorage(plain);
    inst.cssProperties = _.map(plain.properties, (p) => CssProperty.fromStorage(inst, p));
    return inst;
  }

  clone() {
    let copy = new SectionElement(this.page);
    Object.assign(copy, this);
    return copy;
  }

  updateProperty(property, value) {
    const copy = this.clone();
    copy.cssProperties = _.map(copy.cssProperties, (p) => {
      if (p.id == property.id) {
        const updatedProperty = p.clone();
        updatedProperty.value = value;
        return updatedProperty;
      } else {
        return p;
      }
    })
    return copy;
  }
}

export class ColumnsElement extends SectionElement {
  constructor(page) {
    super(page);
    this.columns = [];
  }
}

export class PlainTextElement extends SectionElement {
  constructor(page) {
    super(page);
    this.text = '';
  }

  extrasToStorage() {
    re 
  }
}

export class Page {
  constructor() {
    this.id = uuidV4();
    this.elements = [];
    this.name = 'new page';
    this.elements.push(new SectionElement(this));
  }

  toStorage() {
    return {
      serializableType: 'Page',
      id: this.id,
      name: this.name,
      elements: _.map(this.elements, (e) => e.toStorage())
    };
  }

  static fromStorage(plain) {
    const inst = new Page(); 
    inst.id = plain.id;
    inst.name = plain.name;
    inst.elements = _.map(plain.elements, (e) => SectionElement.fromStorage(inst, e));
    return inst;
  }

  updateName(newName) {
    const clone = this.clone();
    clone.name = newName;
    return clone;
  }

  updateProperty(property, value) {
    const clone = this.clone();
    clone.elements = _.map(clone.elements, (elem) => {
      if (elem.id == property.element.id) {
        return elem.updateProperty(property, value);
      } else {
        return elem;
      }
    });
    return clone;
  }


  clone() {
    const newPage = new Page();
    newPage.elements = this.elements;
    newPage.name = this.name;
    newPage.id = this.id;
    return newPage;
  }
}
SerializableClasses['Page'] = Page;

