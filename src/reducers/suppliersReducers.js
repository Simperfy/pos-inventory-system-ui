import * as types from '../types';

const initialState = [];

export const suppliersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SUPPLIERS:
      return action.payload.suppliers;
    default:
      return state;
  }
};
