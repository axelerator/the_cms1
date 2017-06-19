import { combineReducers } from 'redux';
import { Page } from '../models/elements.js';

import * as CMS from './../models/elements.js';

function setPage(state, page) {
      let newState = {}
      Object.assign(newState, state);
      newState[page.id] = page;
      console.log(newState);
      return newState;
}

const Pages = (state = {}, action) => { 
  const {payload} = action;
  switch (action.type) {
    case 'CHANGE_PAGE_NAME':
      return setPage(state, payload.page.updateName(payload.newName));
    case 'ADD_ELEMENT':
      return setPage(state, payload.page.appendElement(payload.elementType));
    case 'ADD_PAGE':
      return setPage(state, new Page());
    case 'UPDATE_PROPERTY':
      const { property, pageId, elementId, value } = payload;
      const page = state[pageId];
      const newState = setPage(state, page.updateProperty(elementId, property.id, value ));
      return newState;
    case 'UPDATE_PLAIN_TEXT_CONTENT':
      return  setPage(state, 
                      state[payload.pageId]
                       .updateTextProperty(payload.elementId, payload.value));
  }
  return state;
}


const rootReducer = combineReducers({
  pages: Pages,
});

export default rootReducer;
