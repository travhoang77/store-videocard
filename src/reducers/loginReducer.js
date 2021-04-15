import { LOGIN, LOGOFF } from "../actions/types";

const initialState = {
  token: {},
};

export function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}
