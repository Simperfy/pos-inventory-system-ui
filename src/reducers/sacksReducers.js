import * as types from '../types';

const initialState = {
  selectedSackId: '',
  sacks: [],
};

export const sacksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SACKS:
      return {...state, sacks: action.payload.sacks};
    case types.UPDATE_SACK_SELECTED_VALUE:
      return {...state, selectedSackId: action.payload.sackId};
    default:
      return state;
  }
};
