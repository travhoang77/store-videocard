import { LoginActionTypes } from "../constants/loginaction-types";

export const setToken = (token) => {
  return {
    type: LoginActionTypes.LOGIN,
    payload: token,
  };
};

export const removeToken = () => {
  return {
    type: LoginActionTypes.LOGOUT,
  };
};
