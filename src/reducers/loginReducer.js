import { LOGIN, LOGOUT } from "../actions/types";

const jwt = require("jsonwebtoken");
export const initialState = {
  authenticated: false,
  token: null,
  firstname: null,
};
const loginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      const decodeduser = jwt.decode(action.token);
      localStorage.setItem("token", action.token);
      localStorage.setItem("firstname", decodeduser["firstname"]);
      return {
        ...state,
        authenticated: true,
        token: action.token,
        firstname: decodeduser["firstname"],
      };
    case LOGOUT:
      localStorage.clear();
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
