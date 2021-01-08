import * as types from '../types';

const checkRemaining = (remaining) => remaining > 0;

export const updateQuantityOnInput = (e) => (dispatch, getState) => {
  const quantity = parseInt(e.target.value);
  const remaining = getState().item.remaining;
  if ((checkRemaining(remaining) && quantity <= remaining) || isNaN(quantity)) {
    dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
  } else {
    window.alert('out of stock');
  }
};

export const updateQuantity = (quantity) => (dispatch, getState) => {
  const remaining = getState().item.remaining;
  if ((checkRemaining(remaining) && quantity <= remaining) || isNaN(quantity)) {
    dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
  } else {
    window.alert('out of stock');
  }
};

export const resetQuantity = () => (dispatch, getState) => {
  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity: 0}});
};
