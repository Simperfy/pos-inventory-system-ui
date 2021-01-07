import * as types from '../types';

const initialState = 0;

export const kiloReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_KILO:
      return action.payload.kilo;
    default:
      return state;
  }
};
