import * as types from '../types';
import {mapSearchResults} from '../util';

export const updateSearchResults = (data) => (dispatch, getState) => {
  const searchResults = data.length > 0 ? data.slice().map(mapSearchResults) : [];

  dispatch({type: types.UPDATE_SEARCH_RESULTS, payload: {searchResults}});
};
