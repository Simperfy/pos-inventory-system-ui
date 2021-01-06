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

  /*  pendingItems.push({
    id: 'was2345678',
    name: 'Test Item',
    supplierName: 'The Supplier',
    supplierId: 77,
    quantity: 88,
    barcode: '1234567890',
    kilo: 99,
  });*/

  dispatch({type: types.ADD_TO_PENDING_ITEMS, payload: {pendingItems}});
};
