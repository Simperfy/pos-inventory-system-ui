import * as types from '../types';

export const updateQuantityOnInput = (e) => (dispatch, getState) => {
  const quantity = parseInt(e.target.value);

  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
};

export const updateQuantity = (quantity) => (dispatch, getState) => {
  console.log('quantity');
  console.log(quantity);
  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
};


export const resetQuantity = () => (dispatch, getState) => {
  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity: 0}});
};
