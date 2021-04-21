import { applyMiddleware, compose, createStore } from "redux";
import app from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middleware = [thunk, logger];

const enhancer = compose(applyMiddleware(...middleware));

const store = createStore(
	app,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
