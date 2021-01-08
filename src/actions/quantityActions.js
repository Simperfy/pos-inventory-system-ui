import * as types from '../types';
import {isValidQuantity} from '../util';

export const updateQuantityOnInput = (e) => (dispatch, getState) => {
  const quantity = parseInt(e.target.value);
  const remaining = getState().item.remaining;

  if (isValidQuantity(remaining, quantity)) {
    dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
  } else {
    window.alert('out of stock');
  }
};

export const updateQuantity = (quantity) => (dispatch, getState) => {
  const remaining = getState().item.remaining;

  if (isValidQuantity(remaining, quantity)) {
    dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
  } else {
    window.alert('out of stock');
  }
};

export const resetQuantity = () => (dispatch, getState) => {
  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity: 0}});
};
