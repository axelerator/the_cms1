import _ from 'lodash';
import uuidV4 from 'uuid/v4';
import camelize from 'camelize';

import * as P from './properties';
export const SerializableClasses = {};


export class SectionElement {
  constructor() {
    this.id = uuidV4();
    this.cssProperties = [];
    this.cssProperties.push(new P.BorderWidth(this));
    this.cssProperties.push(new P.ColorProperty(this));
  }

  content() {
    return '';
  }

  toStorage() {
    return {
      elementType: this.constructor.name,
      id: this.id,
      properties: _.map(this.cssProperties, (p) => p.toStorage()),
      elementAttributes: this.extrasToStorage()
    };
  }

  extrasToStorage() { 
    return {};
  }

  initFromStorage() {
    // override in subclass to restor subclass specific
    // data
    return {};
  }

  static fromStorage(plain) {
    const factory = {
      SectionElement: SectionElement,
      ColumnsElement: ColumnsElement,
      PlainTextElement: PlainTextElement
    };
    const inst = new factory[plain.elementType]();
    inst.id = plain.id;
    inst.initFromStorage(plain);
    inst.cssProperties = _.map(plain.properties, (p) => P.CssProperty.fromStorage(p));
    inst.extrasFromStorage(plain.elementAttributes || {});
    return inst;
  }

  extrasFromStorage(extrasStorage) {
  }

  clone() {
    let copy = new this.constructor();
    Object.assign(copy, this);
    return copy;
  }

  updateProperty(propertyId, value) {
    const copy = this.clone();
    copy.cssProperties = _.map(copy.cssProperties, (p) => {
      if (p.id == propertyId) {
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

  content() {
    return this.text;
  }

  extrasToStorage() {
    return {
      text: this.text
    };
  }

  updateText(value) {
    const copy = this.clone();
    copy.text = value;
    return copy;
  }

  extrasFromStorage(extrasStorage) {
    this.text = extrasStorage.text;
  }
}

export const ElementTypes = [SectionElement, PlainTextElement, ColumnsElement];

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
    inst.elements = _.map(plain.elements, (e) => SectionElement.fromStorage(e));
    return inst;
  }

  updateName(newName) {
    const clone = this.clone();
    clone.name = newName;
    return clone;
  }

  updateElement(elementId, func) {
    const clone = this.clone();
    clone.elements = _.map(clone.elements, (elem) => {
      if (elem.id == elementId) {
        return func(elem);
      } else {
        return elem;
      }
    });
    return clone;
  }

  updateProperty(elementId, propertyId, value) {
    return this.updateElement(elementId, (elem) => elem.updateProperty(propertyId, value));
  }

  updateTextProperty(elementId, value) {
    return this.updateElement(elementId, (elem) => elem.updateText(value));
  }

  appendElement(elementType) {
    const clone = this.clone();
    clone.elements.push(new elementType(clone));
    return clone;
  }

  clone() {
    const newPage = new Page();
    newPage.elements = this.elements.slice();
    newPage.name = this.name;
    newPage.id = this.id;
    return newPage;
  }
}
SerializableClasses['Page'] = Page;

