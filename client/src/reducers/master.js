import * as Types from '../actions/types';
import * as MasterTypes from '../actions/types/masterTypes';
import store from "store"

export function master(state = {
  loading: false,
  userList: [],
}, action = {}) {
  //console.log("master reduces", action.type)
  switch (action.type) {
    case MasterTypes.REQUEST_GET_USER_LIST:
    case MasterTypes.REQUEST_MASTER_LOGIN:
    case MasterTypes.REQUEST_RECHARGE:
      return Object.assign({}, state, {
        loading: true,
      });
    case MasterTypes.RECEIVE_MASTER_LOGIN_SUCCESS:
      store.set('token', action.response.data.token);
      return Object.assign({}, state, {
        loading: false,
        isPop: false,
        userInfo: action.response.data
      });
    case MasterTypes.RECEIVE_GET_USER_LIST_SUCCESS:
      action.response.data.forEach((obj, key) => {
        obj.key = key
      });
      return Object.assign({}, state, {
        loading: false,
        userList: action.response.data
      });
    case MasterTypes.RECEIVE_RECHARGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
      });
    case  Types.RECEIVE_API_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state
  }
}