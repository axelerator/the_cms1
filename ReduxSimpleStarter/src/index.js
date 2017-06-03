import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';
import PageList from './containers/page_list.js';
import PageEditor from './containers/page_editor.js';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
   <BrowserRouter>
    <div>
      <Route path="pages/:id/edit/" component={PageEditor}/>
      <Route path="/" component={PageList} />
    </div>
   </BrowserRouter>

  </Provider>
  , document.querySelector('.container'));
