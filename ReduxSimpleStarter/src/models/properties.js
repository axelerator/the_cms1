import _ from 'lodash';
import uuidV4 from 'uuid/v4';
import camelize from 'camelize';

export class CssProperty {
  constructor() {
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
    const copy = this.constructor();
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

  static fromStorage(plain) {
    const factory = {
      ColorProperty: ColorProperty,
      BorderWidth: BorderWidth
    };
    const inst = new (factory[plain.propertyType])();
    inst.id = plain.id;
    inst.value = plain.value;
    return inst;
  }
}

export class BoxProperty extends CssProperty {
  constructor() {
    super();
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
  constructor() {
    super();
    this.value = 'black'
  }
  cssPropertyName() { return 'color';}
  cssValue() { return this.value; }
}

export class BorderWidth extends BoxProperty {
  cssPropertyName() { return 'border-width';}
}


