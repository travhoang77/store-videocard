const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

module.exports = {
  authenticate,
  signout,
};

async function authenticate(email, password) {
  let result = { success: false, token: null };

  await instance
    .post("/auth", { email, password })
    .then((response) => {
      result = {
        success: true,
        token: response.headers["authorization"],
      };
    })
    .catch((error) => {
      console.log("authentication ->", error);
    });

  return result;
}

async function signout(token) {
  let result = { success: false, user: null };
  await instance
    .post(
      "/auth/signout",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      result = { success: true, user: response.data.body };
    })
    .catch((error) => {
      console.log("signout ->", error);
    });
  return result;
}
