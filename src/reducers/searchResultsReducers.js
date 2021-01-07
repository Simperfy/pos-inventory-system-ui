import * as types from '../types';

const initialState = [];

export const searchResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SEARCH_RESULTS:
      return action.payload.searchResults;
    default:
      return state;
  }
};
