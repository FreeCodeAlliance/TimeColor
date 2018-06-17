import * as Types from './types';
import {CALL_API} from '../middleware/api'

export function getWindowSize(width, height) {
  return {
    type: Types.GET_WINDOW_SIZE,
    width,
    height,
  };
}

export function showKeyboard() {
  return {
    type: Types.SHOW_KEYBOARD,
  };
}



export function fetchRecords(userId) {
  return {
    [CALL_API]: {
      types: [
        Types.FETCH_RECORDS,
        Types.FETCH_RECORDS_SUCCESS,
        Types.FETCH_RECORDS_FAIL
      ],
      url: '/test',
      method: 'GET',
      //body: userId || 1,
    }
  }
}
