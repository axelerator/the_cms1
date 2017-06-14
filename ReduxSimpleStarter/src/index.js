import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import PageList from './containers/page_list.js';
import PageEditor from './containers/page_editor.js';
import reducers from './reducers';
import * as E from './models/elements.js';

import * as storage from 'redux-storage'

// Import redux and all your reducers as usual
import createEngine from 'redux-storage-engine-localstorage';

// We need to wrap the base reducer, as this is the place where the loaded
// state will be injected.
//
// Note: The reducer does nothing special! It just listens for the LOAD
//       action and merge in the provided state :)
// Note: A custom merger function can be passed as second argument
const reducer = storage.reducer(reducers);

function replacer (key, value) {
  if (value && value.toStorage) {
    console.log(value.toStorage());
    return value.toStorage();
  }
  return value;
}
 
function reviver (key, value) {
  if (value && value.serializableType) {
    const clazz = E.SerializableClasses[value.serializableType];
    console.log(clazz.fromStorage(value));
    return clazz.fromStorage(value);
  }
  return value;
}
// Now it's time to decide which storage engine should be used
//
// Note: The arguments to `createEngine` are different for every engine!
const engine = createEngine('cms_state', replacer, reviver);

// And with the engine we can create our middleware function. The middleware
// is responsible for calling `engine.save` with the current state afer
// every dispatched action.
//
// Note: You can provide a list of action types as second argument, those
//       actions will be filtered and WON'T trigger calls to `engine.save`!
const middleware = storage.createMiddleware(engine);

// As everything is prepared, we can go ahead and combine all parts as usual
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(reducer);




// At this stage the whole system is in place and every action will trigger
// a save operation.
//
// BUT (!) an existing old state HAS NOT been restored yet! It's up to you to
// decide when this should happen. Most of the times you can/should do this
// right after the store object has been created.

// To load the previous state we create a loader function with our prepared
// engine. The result is a function that can be used on any store object you
// have at hand :)
const load = storage.createLoader(engine);
load(store)
    .then((newState) => {
      console.log('Loaded state:', newState);
      ReactDOM.render(
        <Provider store={store}>
         <BrowserRouter>
          <div>
            <Route path="/pages/:id" component={PageEditor}/>
            <Route path="/" component={PageList} />
          </div>
         </BrowserRouter>

        </Provider>
        , document.querySelector('.container'));
      }
    )
    .catch(() => console.log('Failed to load previous state'));

