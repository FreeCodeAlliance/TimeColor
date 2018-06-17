import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as Types from '../actions/types';

function keyboard(state = {
  isShow: false,
}, action = {}) {
  switch (action.type) {
    case "Types.SHOW_KEYBOARD":
      return Object.assign({}, state, {
        isShow: true,
      });
    case "Types.HIDE_KEYBOARD":
      return Object.assign({}, state, {
        isShow: false,
      });
    default:
      break;
  }
  return state;
}

function windowSize(state = {
  width: 0,
  height: 0,
}, action = {}) {
  switch (action.type) {
    case Types.GET_WINDOW_SIZE:
      return Object.assign({}, state, {
        width: action.width || 0,
        height: action.height || 0,
      });
    default:
      return state;
  }
}


function consumeRecords (state ={
  loading:false,
  records:[],
}, action = {}) {
  switch (action.type) {
    case Types.FETCH_RECORDS:
      return Object.assign({}, state, {
        loading: true,
      });
    case Types.FETCH_RECORDS_SUCCESS:
      console.log("state-------------------------->", state, action);
      return Object.assign({}, state, {
        loading: false,
        records: action.response,
      });
    case Types.FETCH_RECORDS_FAIL:
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  routing: routerReducer,
  keyboard,
  windowSize,
  consumeRecords,
});

export default rootReducer;