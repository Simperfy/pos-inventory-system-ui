import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {pendingItemsReducer} from './reducers/pendingItemsReducers';
import {quantityReducer} from './reducers/quantityReducers';
import {searchResultsReducer} from './reducers/searchResultsReducers';
import {suppliersReducer} from './reducers/suppliersReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
      pending: pendingItemsReducer,
      quantity: quantityReducer,
      searchResults: searchResultsReducer,
      suppliers: suppliersReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;
