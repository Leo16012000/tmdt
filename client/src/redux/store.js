import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// import { applyMiddleware, compose } from "redux";

import app from "./reducer";

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, app);

// import logger from "redux-logger";
// import thunk from "redux-thunk";

// const middleware = [thunk, logger];

// const enhancer = compose(applyMiddleware(...middleware));

const store = createStore(
	persistedReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
export default store;
