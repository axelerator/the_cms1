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

const rootReducer = combineReducers({
  currentPage: CurrentPage
});

export default rootReducer;
