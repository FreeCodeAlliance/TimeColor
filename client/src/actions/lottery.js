import * as Types from './types';
import * as LotteryTypes from  './types/lotteryTypes'
import {CALL_API} from '../middleware/api'
import * as UserTypes from "./types/userTypes";

export function fetchLotteryStatus() {
  return {
    [CALL_API]: {
      types: [
        LotteryTypes.REQUEST_LOTTERY,
        LotteryTypes.RECEIVE_LOTTERY_SUCCESS,
        Types.FETCH_RECORDS_FAIL
      ],
      url: '/index/lotteryState',
      method: 'GET',
      isRequireAuth: true,
      //body: userId || 1,
    }
  }
}

export function fetchLotteryResult() {
  return {
    [CALL_API]: {
      types: [
        LotteryTypes.REQUEST_FETCH_LOTTERY_RESULT,
        LotteryTypes.RECEIVE_FETCH_LOTTERY_RESULT_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: '/index/lotteryRes',
      method: 'GET',
      isRequireAuth: true,
    },
  };
}

export function bet(data) {
  return {
    [CALL_API]: {
      types: [
        LotteryTypes.REQUEST_BET_LOTTERY_RESULT,
        LotteryTypes.RECEIVE_BET_LOTTERY_RESULT_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: '/users/bet',
      method: 'POST',
      isRequireAuth: true,
      body: {
        data
      }
    },
  };
}
//
export function fetchtodayLotteryRecords() {
  return {
    [CALL_API]: {
      types: [
        LotteryTypes.REQUEST_TODAY_LOTTERY_RECORDS,
        LotteryTypes.RECEIVE_TODAY_LOTTERY_RECORDS_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: '/index/todayRes',
      method: 'GET',
      isRequireAuth: true
    },
  };
}