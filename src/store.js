import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {pendingItemsReducer} from './reducers/pendingItemsReducers';
import {quantityReducer} from './reducers/quantityReducers';
import {searchResultsReducer} from './reducers/searchResultsReducers';
import {suppliersReducer} from './reducers/suppliersReducers';
import {sacksReducer} from './reducers/sacksReducers';
import {kiloReducer} from './reducers/kiloReducers';
import {discountReducer} from './reducers/discountReducers';
import {priceReducer} from './reducers/priceReducers';
import {itemReducer} from './reducers/itemReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
      pending: pendingItemsReducer,
      quantity: quantityReducer,
      searchResults: searchResultsReducer,
      suppliersStore: suppliersReducer,
      sacksStore: sacksReducer,
      kilo: kiloReducer,
      discount: discountReducer,
      price: priceReducer,
      item: itemReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;
