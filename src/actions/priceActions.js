import * as types from '../types';

export const updatePriceOnInput = (e) => (dispatch, getState) => {
  const price = parseInt(e.target.value);

  dispatch({type: types.UPDATE_PRICE, payload: {price}});
};

export const updatePrice = (price) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_PRICE, payload: {price}});
};
