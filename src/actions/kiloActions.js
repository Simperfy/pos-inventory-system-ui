import * as types from '../types';

export const updateKiloOnInput = (e) => (dispatch, getState) => {
  const kilo = parseInt(e.target.value);

  dispatch({type: types.UPDATE_KILO, payload: {kilo}});
};
