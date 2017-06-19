import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {BoxProperty, ColorProperty} from '../models/properties.js'
import BoxConfig from './box_config.js';
import ColorConfig from './color_config.js';
import { PlainTextElement } from '../models/elements.js';

export class ElementEditor extends Component {
  constructor(props) {
    super(props);
  }

  properties() {
    return _.map(this.props.element.cssProperties, p => {
      if (p instanceof BoxProperty) {
        return <BoxConfig key={p.cssPropertyName()} property={p} pageId={this.props.pageId} elementId={this.props.element.id}/>
      } else if (p instanceof ColorProperty) {
        return <ColorConfig key={p.cssPropertyName()} property={p} pageId={this.props.pageId} elementId={this.props.element.id}/>
      } else {
        return <div>Unkown property</div>;
      }
    })
  }

  render() {
    if (!this.props.element)
      return "<div>Loading...</div>";

    const extras = [];
    if (this.props.element instanceof PlainTextElement) {
      extras.push(<textarea key='textinput' onChange={(e) => this.props.changeText(this.props.pageId, this.props.element.id, e.target.value)}>
                    {this.props.element.text}
                  </textarea>);
    }
    return (
      <div className="element-editor">
        <p>ElementEditor</p>
        { this.properties() }
        { extras }
      </div>
    );
  }

}


function changeText(pageId, elementId, value) {
  return {
    type: 'UPDATE_PLAIN_TEXT_CONTENT',
    payload: { pageId, elementId, value }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeText }, dispatch);
}

export default connect(null, mapDispatchToProps)(ElementEditor);
