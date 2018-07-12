import * as Types from '../actions/types';
import * as LotteryTypes from '../actions/types/lotteryTypes';

export function lottery(state = {
  loading: false,
  status: {state:0 },
  lotteryRecords: [],
  betLog:{},
  lotteryResult:[]
}, action = {}) {
  //console.log("lottery reduces", action.type)
  switch (action.type) {
    case LotteryTypes.REQUEST_LOTTERY:
    case LotteryTypes.REQUEST_FETCH_LOTTERY_RESULT:
    case LotteryTypes.REQUEST_BET_LOTTERY_RESULT:
    case LotteryTypes.REQUEST_TODAY_LOTTERY_RECORDS:
    case  LotteryTypes.REQUEST_RET_LOG:
      return Object.assign({}, state, {
        loading: true,
      });
    case LotteryTypes.RECEIVE_LOTTERY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        isPop: false,
        status: action.response.data
      });
    case LotteryTypes.RECEIVE_FETCH_LOTTERY_RESULT_SUCCESS:
      //console.log(" LotteryTypes.RECEIVE_FETCH_lOTTERY_RESULT_SUCCESS", action.response)
      return Object.assign({}, state, {
        loading: false,
        lotteryResult: action.response.data
      });
    case LotteryTypes.RECEIVE_TODAY_LOTTERY_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        lotteryRecords: action.response.data//.reverse()
      });
    case LotteryTypes.RECEIVE_RET_LOG_SUCCESS:
      console.log(" LotteryTypes.RECEIVE_RET_LOG_SUCCESS", action.response)
      return Object.assign({}, state, {
        loading: false,
        betLog: action.response.data//.reverse()
      });
    case LotteryTypes.RECEIVE_BET_LOTTERY_RESULT_SUCCESS:
    case Types.RECEIVE_API_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state
  }
}