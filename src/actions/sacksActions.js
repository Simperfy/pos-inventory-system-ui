import * as types from '../types';

export const updateSacks = (sacks) => (dispatch, getState) => {
  sacks = sacks.map((s) => ({id: s.sackId, name: s.sackLabel, value: s.sackValue}));

  dispatch({type: types.UPDATE_SACKS, payload: {sacks}});
};

export const updateSackSelectedId = (sackId) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_SACK_SELECTED_VALUE, payload: {sackId}});
};
