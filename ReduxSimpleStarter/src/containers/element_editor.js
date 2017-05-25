import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BoxConfig from './box_config.js';

export default class ElementEditor extends Component {
  constructor(props) {
    super(props);

  }

  properties() {
    return _.map(this.props.element.cssProperties, p => {
      return <BoxConfig key={p.cssPropertyName()} property={p} />
    })
  }

  render() {
    return (
      <div className="element-editor">
        <p>ElementEditor</p>
        { this.properties() }
      </div>
    );
  }

}


