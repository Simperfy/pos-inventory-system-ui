import * as types from '../types';
import {v4 as uuidv4} from 'uuid';

export const addPendingItem = (item) => (dispatch, getState) => {
  const pendingItems = getState().pending.pendingItems?.slice() || [];
  pendingItems.push({
    id: uuidv4(),
    name: item.name,
    supplierName: item.supplierName,
    supplierId: item.supplierId,
    quantity: item.quantity,
    barcode: item.barcode,
    kilo: item.kilo,
  });

  dispatch({type: types.ADD_TO_PENDING_ITEMS, payload: {pendingItems}});
};

export const removeSinglePendingItem = (id) => (dispatch, getState) => {
  const pendingItems = getState().pending.pendingItems?.slice().filter((pi) => pi.id !== id);

  dispatch({type: types.REMOVE_SINGLE_PENDING_ITEMS, payload: {pendingItems}});
};

export const removeAllPendingItems = () => (dispatch, getState) => {
  if (window.confirm('Do you want to remove all items?')) {
    dispatch({type: types.REMOVE_ALL_PENDING_ITEMS, payload: {pendingItems: []}});
  }
};
