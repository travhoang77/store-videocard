import { LOGIN, LOGOFF } from "./types";

export const loginUser = (token) => {
  return {
    type: LOGIN,
    token: token,
  };
};
