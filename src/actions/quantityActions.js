import * as types from '../types';

export const updateQuantityOnInput = (e) => (dispatch, getState) => {
  const quantity = parseInt(e.target.value);

  dispatch({type: types.UPDATE_QUANTITY, payload: {quantity}});
};
