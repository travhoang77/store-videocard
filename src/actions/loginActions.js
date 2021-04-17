import { LOGIN, LOGOUT } from "./types";

export const storeToken = (token) => {
  return {
    type: LOGIN,
    token: token,
  };
};

export const removeToken = () => {
  return {
    type: LOGOUT,
  };
};
