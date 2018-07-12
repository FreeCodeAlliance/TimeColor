import * as Types from '../actions/types';
import * as UserTypes from '../actions/types/userTypes';
import store from "store"

export function user(state = {
    loading: false,
    //isLoggedIn: false,
    isPop: true,
    userInfo: {},
    searchUser: {},
}, action = {}) {
    console.log("userReduces", action.type, action);
    switch (action.type) {
        case UserTypes.REQUEST_ME:
        case UserTypes.REQUEST_REGISTER:
        case UserTypes.REQUEST_LOGIN:
            return Object.assign({}, state, {
                loading: true,
            });
        case UserTypes.RECEIVE_REGISTER_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            isPop: false,
          });
        case UserTypes.RECEIVE_LOGIN_SUCCESS:
          store.set('token', action.response.data.token);
          return Object.assign({}, state, {
            loading: false,
            isPop: false,
            userInfo: action.response.data
          });
        case UserTypes.RECEIVE_ME_SUCCESS:
          return Object.assign({}, state, {
            userInfo: action.response.data
          });
        case UserTypes.RECEIVE_LOGOUT:
          store.remove('token');
        case Types.RECEIVE_API_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        default:
            return state
    }
}
