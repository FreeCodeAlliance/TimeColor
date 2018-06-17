import * as Types from '../actions/types';
import * as UserTypes from '../actions/types/userTypes';

export function user(state = {
    loading: false,
    //isLoggedIn: false,
    isPop: true,
    userInfo: {},
    searchUser: {},
}, action = {}) {
    switch (action.type) {
        case UserTypes.REQUEST_REGISTER:
        case UserTypes.REQUEST_LOGIN:
            return Object.assign({}, state, {
                loading: true,
            });
        case UserTypes.RECEIVE_REGISTER_SUCCESS:
        case UserTypes.RECEIVE_LOGIN_SUCCESS:
            return Object.assign({}, state, {
               loading: false,
                isPop: false
            });
        case  Types.RECEIVE_API_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        default:
            return state
    }
}