import * as types from '../types';

const initialState = {
  text: '',
  barcode: '',
  price: 0,
  remaining: 0,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_ITEM_TEXT:
      return {...state, text: action.payload.text};
    case types.UPDATE_ITEM_BARCODE:
      return {...state, barcode: action.payload.barcode};
    case types.UPDATE_ITEM_PRICE:
      return {...state, price: action.payload.price};
    case types.UPDATE_ITEM_REMAINING:
      return {...state, remaining: action.payload.remaining};
    default:
      return state;
  }
};
