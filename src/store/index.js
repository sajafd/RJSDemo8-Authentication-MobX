import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import thingReducer from "./reducers/thingReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  thingReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
