import { LOGIN, LOGOUT } from "../actions/types";
const jwt = require("jsonwebtoken");

const initialState = {
  token: {},
  user: {},
};

export function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        user: jwt.decode(action.token),
      };
    case LOGOUT:
      return {
        ...state,
        token: {},
        user: {},
      };
    default:
      return state;
  }
}
