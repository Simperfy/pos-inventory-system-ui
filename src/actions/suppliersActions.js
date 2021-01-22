import * as types from '../types';

export const updateSuppliers = (suppliers) => (dispatch, getState) => {
  suppliers = suppliers.map((s) => ({id: s.id, name: s.supplierName}));
  dispatch({type: types.UPDATE_SUPPLIERS, payload: {suppliers}});
};

export const updateSuppliersSelectedIdOnInput = (e) => (dispatch, getState) => {
  const supplierSelectedId = e.target.value;
  dispatch({type: types.UPDATE_SUPPLIER_SELECTED_ID, payload: {supplierSelectedId}});
};

export const updateSuppliersSelectedId = (supplierSelectedId) => (dispatch, getState) => {
  dispatch({type: types.UPDATE_SUPPLIER_SELECTED_ID, payload: {supplierSelectedId: supplierSelectedId.toString()}});
};
