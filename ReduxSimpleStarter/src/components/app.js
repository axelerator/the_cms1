import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageEditor from './../containers/page_editor';


export default class App extends Component {
  render() {
    return (
      <PageEditor />
    );
  }
}
