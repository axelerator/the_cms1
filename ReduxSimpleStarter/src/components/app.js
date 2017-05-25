import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageEditor from './../containers/page_editor';


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
        <PageEditor />
        Reac simple starter!!
        <CMSSection />
      </div>
    );
  }
}
