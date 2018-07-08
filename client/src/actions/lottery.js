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

export function fetchLotterResult() {
  return {
    [CALL_API]: {
      types: [
        LotteryTypes.REQUEST_FETCH_lOTTERY_RESULT,
        LotteryTypes.RECEIVE_FETCH_lOTTERY_RESULT_SUCCESS,
        Types.RECEIVE_API_FAILURE,
      ],
      url: '/index/lotteryRes',
      method: 'GET',
      isRequireAuth: true,
    },
  };
}