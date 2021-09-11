import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { cartReducer } from "./cartReducer";

const reducers = combineReducers({
  login: loginReducer,
  cart: cartReducer,
});

export default reducers;
