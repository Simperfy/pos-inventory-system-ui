import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {pendingItemsReducer} from './reducers/pendingItemsReducers';
import {quantityReducer} from './reducers/quantityReducers';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
      pending: pendingItemsReducer,
      quantity: quantityReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;
