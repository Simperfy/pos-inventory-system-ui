import * as types from '../types';
import {mapSacks} from '../util';

export const updateSacks = (sacks) => (dispatch, getState) => {
  sacks = sacks.map(mapSacks);

  dispatch({type: types.UPDATE_SACKS, payload: {sacks}});
};

export const updateSacksAndKilo = (sacks) => (dispatch, getState) => {
  sacks = sacks.map(mapSacks);
  const kilo = sacks[0]?.value || 0;

  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
  dispatch({type: types.UPDATE_SACKS, payload: {sacks}});
};

export const updateSackSelectedId = (sackId) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_SACK_SELECTED_VALUE, payload: {sackId}});
};

export const updateSackSelectedIdAndKilo = (sackId) => (dispatch, getState) => {
  const kilo = getState().sacksStore.sacks.find((s) => s.id === sackId).value;

  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
  dispatch({type: types.UPDATE_SACK_SELECTED_VALUE, payload: {sackId}});
};

export const updateSackSelectedIdWith = (sackId, params) => (dispatch, getState) => {
  const sack = getState().sacksStore.sacks.find((s) => s.id === sackId);

  if (params.some((p) => p === 'kilo')) {
    const kilo = sack.value;
    dispatch({type: types.UPDATE_KILO, payload: {kilo}});
  }

  if (params.some((p) => p === 'price')) {
    const price = sack.price;
    dispatch({type: types.UPDATE_PRICE, payload: {price}});
  }

  dispatch({type: types.UPDATE_SACK_SELECTED_VALUE, payload: {sackId}});
};
