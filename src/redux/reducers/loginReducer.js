import { LoginActionTypes } from "../constants/loginaction-types";
const jwt = require("jsonwebtoken");

const initialState = {
  authenticated: false,
  token: null,
  firstname: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN:
      const decodeduser = jwt.decode(action.payload);
      return {
        ...state,
        authenticated: true,
        token: action.payload,
        firstname: decodeduser["firstname"],
      };
    case LoginActionTypes.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null,
        firstname: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
