import * as Types from '../actions/types';
import * as LotteryTypes from '../actions/types/lotteryTypes';

export function lottery(state = {
  loading: false,
  status: [],
}, action = {}) {
  console.log("lottery reduces", action.type)
  switch (action.type) {
    case LotteryTypes.REQUEST_LOTTERY:
      return Object.assign({}, state, {
        loading: true,
      });
    case LotteryTypes.RECEIVE_LOTTERY_SUCCESS:
      console.log("action.response.data", action.response.data);
      return Object.assign({}, state, {
        loading: false,
        isPop: false,
        status: action.response.data
      });
    case  Types.RECEIVE_API_FAILURE:
      return Object.assign({}, state, {
        loading: false,
      });
    default:
      return state
  }
}