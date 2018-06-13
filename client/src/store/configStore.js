//FIX ME  version bug ??

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import API from '../middleware/api';

export default createStore(
  rootReducer,
  applyMiddleware(thunk, API)
);

