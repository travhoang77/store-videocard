import { LOGIN, LOGOFF } from "./types";

// export const loginUser = async (email, password) => {
//   alert(`login user ${email}, ${password}`);
//   let token = null;

//   await instance
//     .post("/auth", { email, password })
//     .then((response) => {
//       console.log(`retrieved token ->`, response.data.body.access_tokens);
//       token = response.data.body.access_tokens[0];
//     })
//     .catch((error) => console.log(`-error`, error));

//   return {
//     type: LOGIN,
//     token: token,
//   };
// };

export const storeToken = (token) => {
  return {
    type: LOGIN,
    token: token,
  };
};
