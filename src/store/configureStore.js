'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import InitState from '../initialState';

function configureStore(initialState=InitState) {

  const logger = createLogger();

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      // logger
    ));
}

export default configureStore;
