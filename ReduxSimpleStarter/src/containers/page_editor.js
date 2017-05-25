import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BoxProperty } from '../models/elements.js';


class BoxConfig extends Component {
  constructor(props) {
    super(props);
    const property = new BoxProperty();

    this.state = {
      top: property.top,
      bottom: property.bottom,
      right: property.right,
      left: property.left,
      unit: property.unit
    }
    this.updateLeft = this.updateLeft.bind(this);
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

  render() {
    return (
      <div className="box-config">
        <div><input onChange={this.updateTop} value={this.state.top}/></div>
        <div><input onChange={this.updateRight} value={this.state.right}/></div>
        <div><input onChange={this.updateBottom} value={this.state.bottom}/></div>
        <div><input onChange={this.updateLeft} value={this.state.left}/></div>
      </div>
    );
  }

}

class PageEditor extends Component {
  constructor(props) {
    super(props)
  }

  elements() {
    return _.map(this.props.page.elements, e => {
      return <BoxConfig key={e.id}  />
    })
  }

  render() {
    if (!this.props.page)
      return <div>Loading..</div>;
    return (
      <div>page editor{ this.props.page.name}
        <input value={this.props.page.name} onChange={(e) => this.props.changeNameAction(e.target.value)}/>
        <div className="elements">
          { this.elements() }
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { page: state.currentPage};
}

function changeNameAction(newName) {
  return {
    type: 'CHANGE_PAGE_NAME',
    payload: newName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeNameAction: changeNameAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
