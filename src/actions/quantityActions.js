import * as types from '../types';

export const updateQuantity = (e) => (dispatch, getState) => {
  const quantity = parseInt(e.target.value);

  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
};
