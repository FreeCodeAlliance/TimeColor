import * as Types from '../actions/types';
import * as UserTypes from '../actions/types/userTypes';
import store from "store"

//export const REQUEST_ME = 'REQUEST_ME';
//export const RECEIVE_ME_SUCCESS = 'RECEIVE_ME_SUCCESS';

export function user(state = {
    loading: false,
    //isLoggedIn: false,
    isPop: true,
    userInfo: {},
    searchUser: {},
}, action = {}) {
    switch (action.type) {
        case UserTypes.REQUEST_ME:
        case UserTypes.REQUEST_REGISTER:
        case UserTypes.REQUEST_LOGIN:
            return Object.assign({}, state, {
                loading: true,
            });
        case UserTypes.RECEIVE_REGISTER_SUCCESS:
        case UserTypes.RECEIVE_LOGIN_SUCCESS:
          store.set('token', action.response.data.token);
          return Object.assign({}, state, {
            loading: false,
            isPop: false,
            userInfo: action.response.data
          });
        case UserTypes.RECEIVE_ME_SUCCESS:
          console.log("----------RECEIVE_ME_SUCCESS----------------------------", action.response.data);
          return Object.assign({}, state, {
            userInfo: action.response.data
          });
        case  Types.RECEIVE_API_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        default:
            return state
    }
}
