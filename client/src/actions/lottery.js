import * as Types from './types';
import * as LotteryTypes from  './types/lotteryTypes'
import {CALL_API} from '../middleware/api'

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
