import * as types from '../types';

export const updateKiloOnInput = (e) => (dispatch, getState) => {
  const kilo = parseFloat(e.target.value);

  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
};

export const updateKilo = (kilo) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
};

export const updateKiloBySackId = (sackId) => (dispatch, getState) => {
  const kilo = getState().sacksStore.sacks.find((s) => s.id === sackId).value;

  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
};

export const updateKiloOnInputAndPrice = (e) => (dispatch, getState) => {
  const kilo = parseFloat(e.target.value);
  let price = getState().item.price * kilo;

  if (isNaN(price)) price = 0;

  dispatch({type: types.UPDATE_PRICE, payload: {price}});
  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
};
