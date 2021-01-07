import * as types from '../types';

const initialState = {
  supplierSelectedId: '',
  suppliers: [],
};

export const suppliersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SUPPLIERS:
      return {...state, suppliers: action.payload.suppliers};
    case types.UPDATE_SUPPLIER_SELECTED_ID:
      return {...state, supplierSelectedId: action.payload.supplierSelectedId};
    default:
      return state;
  }
};
