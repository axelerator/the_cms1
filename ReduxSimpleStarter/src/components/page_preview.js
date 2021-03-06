import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ElementPreview extends Component {
  constructor(props) {
    super(props);

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
        <pre>
          {JSON.stringify(style).replace(/,/g, "\n")}
        </pre>
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

