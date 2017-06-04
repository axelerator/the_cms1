import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BoxProperty } from '../models/elements.js';

class BoxConfig extends Component {
  constructor(props) {
    super(props);
    const property = props.property.value;

    this.state = {
      top: property.top,
      bottom: property.bottom,
      right: property.right,
      left: property.left,
      unit: property.unit
    }
    this.updateTop = this.updateTop.bind(this);
    this.updateRight = this.updateRight.bind(this);
    this.updateBottom = this.updateBottom.bind(this);
    this.updateLeft = this.updateLeft.bind(this);
    this.updateUnit = this.updateUnit.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateUnit(e) {
    this.setState({ unit: e.target.value });
  }

  updateTop(e) {
    const num = parseInt(e.target.value);
    this.setState({ top: num });
  }

  updateRight(e) {
    const num = parseInt(e.target.value);
    this.setState({ right: num });
  }

  updateBottom(e) {
    const num = parseInt(e.target.value);
    this.setState({ bottom: num });
  }

  updateLeft(e) {
    const num = parseInt(e.target.value);
    this.setState({ left: num });
  }

  submit() {
    this.props.changeBoxProperty(this.props.property, this.state);
  }

  render() {
    return (
      <div className="box-config">
        <div className="top"><input onChange={this.updateTop} onBlur={this.submit} value={this.state.top}/></div>
        <div className="left"><input onChange={this.updateLeft} onBlur={this.submit} value={this.state.left}/></div>
        <div className="unit"><input onChange={this.updateUnit} onBlur={this.submit} value={this.state.unit}/></div>
        <div className="right"><input onChange={this.updateRight} onBlur={this.submit} value={this.state.right}/></div>
        <div className="bottom"><input onChange={this.updateBottom} onBlur={this.submit} value={this.state.bottom}/></div>
      </div>
    );
  }

}


function changeBoxProperty(property, value) {
  return {
    type: 'UPDATE_PROPERTY',
    payload: { property, value }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeBoxProperty }, dispatch);
}

export default connect(null, mapDispatchToProps)(BoxConfig);

