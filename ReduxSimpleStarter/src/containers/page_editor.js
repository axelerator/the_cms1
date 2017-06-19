import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import PagePreview from './../components/page_preview.js';
import ElementEditor from './element_editor.js';
import { SectionElement, PlainTextElement } from '../models/elements.js';

class PageEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedElement: null
    };

  }

  componentDidMount() {
    const { id } = this.props.match.params;
  }

  selectElement(e) {
    this.setState( { selectedElement: e});
  }

  render() {
    if (!this.props.page)
      return <div>Loading..</div>;

    const elementTypes = _.map([SectionElement, PlainTextElement], e => ( 
      <div key={e.name} onClick={() => this.props.addElement(this.props.page, e)}>
        {e.name}
        </div>
    ));

    const elements = _.map(this.props.page.elements, e => {
      return <ElementEditor key={e.id} element={e} />
    })
    let element = '';
    if (this.state.selectedElement) {
      element = <ElementEditor key={this.state.selectedElement.id} element={this.state.selectedElement} pageId={this.props.page.id}/>
    }

    const previews = _.map(this.props.page.elements , e => {
      const style = {
        borderStyle: 'solid',
        borderColor: 'red'
      };
      e.cssProperties.forEach((p) => {
        style[p.reactCssName()] = p.cssValue();
      });

      return <div className="element-preview-wrapper" key={e.id} onClick={() => this.selectElement(e)}>
        <div className="element-preview"style={style}>
        { e.content() } 
        </div>
        </div>
    });

    return (
      <div className="cms">
        <div className="menu">
        <Link to="/">home</Link>
        </div>
        <div className="elements-picker">
        { elementTypes }
        </div>
        <div className="page-preview">
        { previews }
        </div>
        <div className="page-editor">page editor{ this.props.page.name}
        <input value={this.props.page.name} onChange={(e) => this.props.changeNameAction(this.props.page, e.target.value)}/>
        <div className="elements">
        { element }
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

function addElement(page, elementType) {
  return {
    type: 'ADD_ELEMENT',
    payload: { page, elementType }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {changeNameAction, addElement}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
