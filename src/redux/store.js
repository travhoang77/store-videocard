import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        latency: 0,
      })
  )
);

export default store;
