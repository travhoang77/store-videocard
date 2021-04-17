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
      console.log(error);
    });

  return result;
}
