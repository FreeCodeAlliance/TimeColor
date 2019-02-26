import * as Types from '../actions/types';
import * as GiftUserTypes from '../actions/types/giftUsersTypes';
//import store from "store"

export function giftUser(state = {
    loading: false,
    usersInfo: [],
}, action = {}) {
    switch (action.type) {
        case GiftUserTypes.REQUEST_GIFT_USERS:
        case GiftUserTypes.REQUEST_CREATE_USERS:
        case GiftUserTypes.REQUEST_REMOVE_USERS:
            return Object.assign({}, state, {
                loading: true,
            });
        case GiftUserTypes.RECEIVE_REMOVE_USERS_SUCCESS:
        case GiftUserTypes.RECEIVE_CREATE_USERS_SUCCESS:

            return Object.assign({}, state, {
                loading: false,
            });
        case GiftUserTypes.RECEIVE_GIFT_USERS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                usersInfo: action.response.data
            });
        case Types.RECEIVE_API_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        default:
            return state
    }
}


export function giftsDetail(state = {
    loading: false,
    userGifts: [],
}, action = {}) {
    switch (action.type) {
        case GiftUserTypes.REQUEST_GIVE_USER:
        case GiftUserTypes.REQUEST_REMOVE_GIFT_RECORD:
        case GiftUserTypes.REQUEST_USER_SIGN_IN_RECORD:
        case GiftUserTypes.REQUEST_GET_USER_GIFTS:
            return Object.assign({}, state, {
                loading: true,
            });
        case GiftUserTypes.RECEIVE_USER_SIGN_IN_SUCCESS:
        case GiftUserTypes.RECEIVE_GIVE_USER_SUCCESS:
        case GiftUserTypes.RECEIVE_REMOVE_GIFT_RECORD_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
            });
        case GiftUserTypes.RECEIVE_GET_USER_GIFTS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                userGifts: action.response.data
            });
        case Types.RECEIVE_API_FAILURE:
            return Object.assign({}, state, {
                loading: false,
            });
        default:
            return state
    }
}
