import * as types from '../types';
import {v4 as uuidv4} from 'uuid';

// for inventory
export const addPendingInventoryItem = (item) => (dispatch, getState) => {
  const pendingItems = getState().pending.pendingItems?.slice() || [];
  const supplierSelectedId = getState().suppliersStore.supplierSelectedId;
  const supplierName = getState().suppliersStore.suppliers.find((s) => s.id === supplierSelectedId).name;

  const isAlreadyAdded = pendingItems.some((pi) => pi.barcode === item.barcode && pi.supplierId === supplierSelectedId);

  if (isAlreadyAdded) return alert(`${item.name} item with same supplier already exist. Please remove duplicate first.`);

  pendingItems.push({
    id: uuidv4(),
    name: item.name,
    supplierName: supplierName,
    supplierId: supplierSelectedId,
    quantity: item.quantity,
    barcode: item.barcode,
    kilo: item.kilo,
  });

  dispatch({type: types.ADD_TO_PENDING_ITEMS, payload: {pendingItems}});
};

// for sales
export const addPendingSalesItem = (item) => (dispatch, getState) => {
  const pendingSalesItems = getState().pending.pendingItems?.slice() || [];

  pendingSalesItems.push({
    id: uuidv4(),
    name: item.name,
    quantity: item.quantity,
    barcode: item.barcode,
    kilo: item.kilo,
    discount: item.discount,
    price: item.price,
  });

  dispatch({type: types.ADD_TO_PENDING_SALES_ITEMS, payload: {pendingItems: pendingSalesItems}});
};

export const removeSinglePendingItem = (id) => (dispatch, getState) => {
  const pendingItems = getState().pending.pendingItems?.slice().filter((pi) => pi.id !== id);

  dispatch({type: types.REMOVE_SINGLE_PENDING_ITEMS, payload: {pendingItems}});
};

export const removeAllPendingItems = (warn = true) => (dispatch, getState) => {
  let confirm = true;
  if (warn) confirm = window.confirm('Do you want to remove all items?');

  if (confirm) dispatch({type: types.REMOVE_ALL_PENDING_ITEMS, payload: {pendingItems: []}});
};
