import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import PagePreview from './../components/page_preview.js';
import ElementEditor from './element_editor.js';

class PageEditor extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { id } = this.props.match.params;
  }

  render() {
    const elements = _.map(this.props.page.elements, e => {
      return <ElementEditor key={e.id} element={e} />
    })

    if (!this.props.page)
      return <div>Loading..</div>;
    return (
      <div className="cms">
        <Link to="/">home</Link>
        <PagePreview page={this.props.page}/>
        <div className="page-editor">page editor{ this.props.page.name}
          <input value={this.props.page.name} onChange={(e) => this.props.changeNameAction(this.props.page, e.target.value)}/>
          <div className="elements">
            { elements }
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps({ pages }, ownProps ) {
  return { page: pages[ownProps.match.params.id], pages: pages};
}

function changeNameAction(page, newName) {
  return {
    type: 'CHANGE_PAGE_NAME',
    payload: { page, newName }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeNameAction: changeNameAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
