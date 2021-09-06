import { ActionTypes } from "../constants/action-types";
const jwt = require("jsonwebtoken");

const initialState = {
  authenticated: false,
  token: null,
  firstname: null,
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN:
      const decodeduser = jwt.decode(payload);
      return {
        ...state,
        authenticated: true,
        token: payload,
        firstname: decodeduser["firstname"],
      };
    case ActionTypes.LOGOUT:
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
