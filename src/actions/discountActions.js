import * as types from '../types';

export const updateDiscount = (e) => (dispatch, getState) => {
  const discount = parseFloat(e.target.value);

  dispatch({type: types.UPDATE_DISCOUNT, payload: {discount}});
};
