import { combineReducers } from 'redux';
import { Page } from '../models/elements.js';

import * as CMS from './../models/elements.js';

const CurrentPage = (state = new Page(), action) => { 
  switch (action.type) {
    case 'CHANGE_PAGE_NAME':
      return state.updateName(action.payload);
      
  }
  return state;
}

const Pages = (state = {}, action) => { 
  switch (action.type) {
    case 'ADD_PAGE':
      const newPage = new Page();
      let newState = {}
      Object.assign(newState, state);
      newState[newPage.id] = newPage;
      return newState;
  }
  return state;
}

const rootReducer = combineReducers({
  currentPage: CurrentPage,
  pages: Pages
});

export default rootReducer;
