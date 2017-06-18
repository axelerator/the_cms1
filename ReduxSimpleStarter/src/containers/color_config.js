import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CssProperty } from '../models/elements.js';

class ColorConfig extends Component {
  constructor(props) {
    super(props);
    this.state = { colorValue: props.property.value };
    this.updateValue = this.updateValue.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateValue(e) {
    this.setState({ colorValue: e.target.value });
  }

  submit() {
    this.props.changeColor(this.props.pageId, this.props.elementId, this.props.property, this.state.colorValue);
  }

  render() {
    return (
      <div className="color-config">
        Color<input onChange={this.updateValue} onBlur={this.submit} value={this.state.colorValue} />
      </div>
      );
  }
}


function changeColor(pageId, elementId, property, value) {
  return {
    type: 'UPDATE_PROPERTY',
    payload: { pageId, elementId, property, value }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeColor }, dispatch);
}

export default connect(null, mapDispatchToProps)(ColorConfig);
