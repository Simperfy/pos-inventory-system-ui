import * as types from '../types';

const initialState = {pendingItems: []};

export const pendingItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_PENDING_ITEMS:
    case types.REMOVE_ALL_PENDING_ITEMS:
    case types.REMOVE_SINGLE_PENDING_ITEMS:
    case types.ADD_TO_PENDING_SALES_ITEMS:
      return {pendingItems: action.payload.pendingItems};
    default:
      return state;
  }
};
