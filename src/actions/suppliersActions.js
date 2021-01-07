import * as types from '../types';

export const updateSuppliers = (suppliers) => (dispatch, getState) => {
  suppliers = suppliers.map((s) => ({id: s.id, name: s.supplierName}));
  dispatch({type: types.UPDATE_SUPPLIERS, payload: {suppliers}});
};
