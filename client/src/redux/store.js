import { applyMiddleware, compose, createStore } from "redux";
import app from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const middleware = [thunk, logger];

const enhancer = compose(applyMiddleware(...middleware));

const store = createStore(app, enhancer);

export default store;
