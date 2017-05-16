import { combineReducers } from 'redux';

import * as CMS from './../models/elements.js';

const CurrentPage = () => { return new CMS.Page()}

const rootReducer = combineReducers({
  currentPage: CurrentPage
});

export default rootReducer;
