import * as types from '../types';

export const updateSacks = (sacks) => (dispatch, getState) => {
  sacks = sacks.map((s) => ({id: s.sackId, name: s.sackLabel, value: s.sackValue}));

  dispatch({type: types.UPDATE_SACKS, payload: {sacks}});
};

export const updateSacksAndKilo = (sacks) => (dispatch, getState) => {
  sacks = sacks.map((s) => ({id: s.sackId, name: s.sackLabel, value: s.sackValue}));
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
