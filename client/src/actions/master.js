import * as Types from './types';
import * as MasterTypes from './types/masterTypes';
import { CALL_API } from '../middleware/api';
import * as UserTypes from "./types/userTypes";


export function masterLogin(account, password) {
  return {
    account,
    password,
    [CALL_API]: {
      types: [
        MasterTypes.REQUEST_MASTER_LOGIN,
        MasterTypes.RECEIVE_MASTER_LOGIN_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: `/masters/login?account=${account}&password=${password}`,
      method: 'GET',
      isRequireAuth: false,
      body: {
        account,
        password
      }
    },
  }
}

export function getUserList() {
  return {
    [CALL_API]: {
      types: [
        MasterTypes.REQUEST_GET_USER_LIST,
        MasterTypes.RECEIVE_GET_USER_LIST_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: `/masters/getUsers`,
      method: 'GET',
      isRequireAuth: true,
    },
  }
}

export function userRecharge(account, value) {
  return {
    [CALL_API]: {
      types: [
        MasterTypes.REQUEST_RECHARGE,
        MasterTypes.RECEIVE_RECHARGE_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: '/masters/recharge',
      method: 'POST',
      isRequireAuth: true,
      body: {
        account,
        value,
      },
    },
  };
}
