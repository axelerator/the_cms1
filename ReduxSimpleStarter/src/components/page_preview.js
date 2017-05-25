import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ElementPreview extends Component {
  constructor(props) {
    super(props);

  }

  properties() {
    return _.map(this.props.element.cssProperties, p => {
      return <BoxConfig key={p.cssPropertyName()} property={p} />
    })
  }

  render() {
    const style = {
      borderStyle: 'solid',
      borderColor: 'red'
    };
    this.props.element.cssProperties.forEach((p) => {
      style[p.reactCssName()] = p.cssValue();
    });
    return (
      <div className="element-preview" style={style}>
        <p>ElementPreview</p>
      </div>
    );
  }

}



export default class PagePreview extends Component {
  constructor(props) {
    super(props);

  }

  elements() {
    return _.map(this.props.page.elements, e => {
      return <ElementPreview key={e.id} element={e} />
    })
  }

  render() {
    return (
      <div className="page-preview">
        { this.elements() }
      </div>
    );
  }

}

