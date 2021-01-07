import * as types from '../types';

export const updateDiscountOnInput = (e) => (dispatch, getState) => {
  const discount = parseFloat(e.target.value);

  dispatch({type: types.UPDATE_DISCOUNT, payload: {discount}});
};
