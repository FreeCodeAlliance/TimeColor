import * as Types from './types';
import * as GiftUserTypes from './types/giftUsersTypes'
import { CALL_API } from '../middleware/api';
import * as MasterTypes from "./types/masterTypes";
import * as LotteryTypes from "./types/lotteryTypes";

export function getGiftUserList() {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_GIFT_USERS,
                GiftUserTypes.RECEIVE_GIFT_USERS_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/users`,
            method: 'GET',
            isRequireAuth: true,
        },
    }
}

export function createGiftUser(name, fightTimes = 0) {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_CREATE_USERS,
                GiftUserTypes.RECEIVE_CREATE_USERS_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/addUsers`,
            method: 'post',
            isRequireAuth: true,
            body: { name, fightTimes}
        },
    }
}

export function removeGiftUser(id) {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_REMOVE_USERS,
                GiftUserTypes.RECEIVE_REMOVE_USERS_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/removeUser`,
            method: 'post',
            isRequireAuth: true,
            body: { id }
        },
    }
}

// 给用户发礼包
export function giveGiftUser(userId, name, giftQuality) {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_GIVE_USER,
                GiftUserTypes.RECEIVE_GIVE_USER_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/addGift`,
            method: 'post',
            isRequireAuth: true,
            body: { userId, name, giftQuality }
        },
    }
}

// 给用户签到次数
export function userSignIn(uid, fightTimes) {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_USER_SIGN_IN_RECORD,
                GiftUserTypes.RECEIVE_USER_SIGN_IN_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/userSignIn`,
            method: 'post',
            isRequireAuth: true,
            body: { uid, fightTimes }
        },
    }
}

export function removeGiftRecord(id) {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_REMOVE_GIFT_RECORD,
                GiftUserTypes.RECEIVE_REMOVE_GIFT_RECORD_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/removeGiftRecord`,
            method: 'post',
            isRequireAuth: true,
            body: { id }
        },
    }
}

export function getUserGifts() {
    return {
        [CALL_API]: {
            types: [
                GiftUserTypes.REQUEST_GET_USER_GIFTS,
                GiftUserTypes.RECEIVE_GET_USER_GIFTS_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: `/gifts/userGifts`,
            method: 'GET',
            isRequireAuth: true
        },
    };
}


















