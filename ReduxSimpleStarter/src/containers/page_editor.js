import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PagePreview from './../components/page_preview.js';
import ElementEditor from './element_editor.js';

class PageEditor extends Component {
  constructor(props) {
    super(props)
  }

  elements() {
    return _.map(this.props.page.elements, e => {
      return <ElementEditor key={e.id} element={e} />
    })
  }

  render() {
    if (!this.props.page)
      return <div>Loading..</div>;
    return (
      <div className="cms">
        <PagePreview page={this.props.page}/>
        <div className="page-editor">page editor{ this.props.page.name}
          <input value={this.props.page.name} onChange={(e) => this.props.changeNameAction(e.target.value)}/>
          <div className="elements">
            { this.elements() }
          </div>

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
