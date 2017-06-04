import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {BoxProperty, ColorProperty} from '../models/elements.js'
import BoxConfig from './box_config.js';
import ColorConfig from './color_config.js';

export default class ElementEditor extends Component {
  constructor(props) {
    super(props);

  }

  properties() {
    return _.map(this.props.element.cssProperties, p => {
      if (p instanceof BoxProperty) {
        return <BoxConfig key={p.cssPropertyName()} property={p} />
      } else if (p instanceof ColorProperty) {
        return <ColorConfig key={p.cssPropertyName()} property={p} />
      } else {
        return <div>Unkown property</div>;
      }
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


