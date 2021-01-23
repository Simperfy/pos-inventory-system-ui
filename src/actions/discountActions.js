import * as types from '../types';

export const updateDiscountOnInput = (e) => (dispatch, getState) => {
  let discount = parseFloat(e.target.value);
  if (isNaN(discount)) discount = 0;

  const price = getState().price;

  if (discount >= price) dispatch({type: types.UPDATE_DISCOUNT, payload: {discount: price}});

  if (price > 0 && discount <= price) dispatch({type: types.UPDATE_DISCOUNT, payload: {discount}});
};

export const resetDiscount = () => (dispatch, getState) => {
  dispatch({type: types.RESET_DISCOUNT});
};
