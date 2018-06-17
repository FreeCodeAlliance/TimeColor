import * as Types from './types';
import * as UserTypes from './types/userTypes';
import { CALL_API } from '../middleware/api';


export function register(account, password) {
    return {
        account,
        password,
        [CALL_API]: {
            types: [
                UserTypes.REQUEST_REGISTER,
                UserTypes.RECEIVE_REGISTER_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            url: '/users/register',
            method: 'POST',
            isRequireAuth: false,
            body: {
                account,
                password,
            },
        },
    };
}

export function login(account, password) {
    return {
        account,
        password,
        [CALL_API]: {
            types: [
                UserTypes.REQUEST_LOGIN,
                UserTypes.RECEIVE_LOGIN_SUCCESS,
                Types.RECEIVE_API_FAILURE,
            ],
            //url: '/users/login', `/courses/${courseId}`,
            url: `/users/login?account=${account}&password=${password}`,
            method: 'GET',
            isRequireAuth: false,
            body: {
                account,
                password
            }
        },
    }
}