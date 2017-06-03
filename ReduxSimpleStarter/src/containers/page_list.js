import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PagePreview from './../components/page_preview.js';
import ElementEditor from './element_editor.js';
import { bindActionCreators } from 'redux';

class PageList extends Component {
  constructor(props) {
    super(props)
    this.newPage = this.props.newPage.bind(this);
  }

  render() {
    const pages = _.map(_.values(this.props.pages || {}), p => (<li>{p.name}</li>));
    return (<ul>
        {pages}
      <li onClick={this.newPage}>new page</li>
      </ul>);
  }
}

function mapStateToProps(state) {
  return { pages: state.pages};
}

function addPage() {
  return {
    type: 'ADD_PAGE'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({newPage: addPage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
