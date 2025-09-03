// store.js
import { createStore, compose } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./combine-reducer";

// persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// wrap root reducer with persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// safe enhancer setup for Redux DevTools
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
export const store = createStore(
    persistedReducer,
    composeEnhancers()
);

// create persistor (to retain state on reloads)
export const persistor = persistStore(store);
