const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

module.exports = {
  authenticate,
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
  //- or after instance has been created
  instance.defaults.headers.post["authorization"] = token;
  await instance
    .post("/signout")
    .then((response) => {
      result = { success: true, user: response.data.body };
    })
    .catch((error) => {
      console.log("signout ->", error);
    });
  return result;
}
