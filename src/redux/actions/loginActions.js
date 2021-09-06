import { ActionTypes } from "../constants/action-types";

export const setToken = (token) => {
  return {
    type: ActionTypes.LOGIN,
    payload: token,
  };
};

export const removeToken = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};
