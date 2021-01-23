import * as types from '../types';

const initialState = 0;

export const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DISCOUNT:
      return action.payload.discount;
    case types.RESET_DISCOUNT:
      return 0;
    default:
      return state;
  }
};
