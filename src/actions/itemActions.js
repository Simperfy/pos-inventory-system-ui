import * as types from '../types';

export const updateItemText = (text) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_ITEM_TEXT, payload: {text}});
};

export const updateItemBarcode = (barcode) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_ITEM_BARCODE, payload: {barcode}});
};

export const updateItemPrice = (price) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_ITEM_PRICE, payload: {price}});
};

export const updateItemRemaining = (remaining) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_ITEM_REMAINING, payload: {remaining}});
};
