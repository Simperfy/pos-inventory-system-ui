import * as types from '../types';

const initialState = 0;

export const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_PRICE:
      return action.payload.price;
    default:
      return state;
  }
};
