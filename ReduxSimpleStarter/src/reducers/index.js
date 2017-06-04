import { combineReducers } from 'redux';
import { Page } from '../models/elements.js';

import * as CMS from './../models/elements.js';

const CurrentPage = (state = new Page(), action) => { 
  switch (action.type) {
    case 'EDIT_PAGE':
      return state = action.payload;
    case 'CHANGE_PAGE_NAME':
      return state.updateName(action.payload);
      
  }
  return state;
}

function setPage(state, page) {
      let newState = {}
      Object.assign(newState, state);
      newState[page.id] = page;
      return newState;
}

const Pages = (state = {}, action) => { 
  const {payload} = action;
  switch (action.type) {
    case 'CHANGE_PAGE_NAME':
      return setPage(state, payload.page.updateName(payload.newName));
    case 'ADD_PAGE':
      return setPage(state, new Page());
    case 'UPDATE_PROPERTY':
      const { property } = payload;
      const { value } = payload;
      const { page } = property.element;
      const newState = setPage(state, page.updateProperty(property, value ));
      console.log('asd', action, value);
      return newState;
  }
  return state;
}

const rootReducer = combineReducers({
  currentPage: CurrentPage,
  pages: Pages
});

export default rootReducer;
