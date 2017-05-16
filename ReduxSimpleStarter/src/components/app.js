import React, { Component } from 'react';
import { connect } from 'react-redux';

class BoxConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      right: 10
    }
    this.updateLeft = this.updateLeft.bind(this);
  }
  updateLeft(e) {
    const num = parseInt(e.target.value);
    this.setState({ left: num });
  }

  render() {
    return (
      <div>
        <div><input onChange={this.updateLeft} value={this.state.left}/></div>
      </div>
    );
  }

}

class CMSSection extends Component {
  render() {
    return (
      <section>SECTION!!</section>
    );
  }

}

export default class App extends Component {
  render() {
    return (
      <div>
        <BoxConfig />
        Reac simple starter!!
        <CMSSection />
      </div>
    );
  }
}
