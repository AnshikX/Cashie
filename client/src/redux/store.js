// store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./reducers";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;