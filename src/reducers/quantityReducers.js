import * as types from '../types';

const initialState = 0;

export const quantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_QUANTITY:
      return action.payload.quantity;
    case types.RESET_QUANTITY:
      return 0;
    default:
      return state;
  }
};
