const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

module.exports = {
  emailExists,
  create,
};

async function emailExists(email) {
  let result = { success: false, message: "Email does not exists" };

  await instance
    .get(`/auth/${email}`)
    .then((response) => {
      if (response.data.success) {
        result = { success: true, message: response.data.message };
      }
    })
    .catch((error) => {
      console.log("emailExists error-->", error);
    });

  return result;
}

async function create(user) {
  let result = { success: false, user: null };

  await instance
    .post("/users", user)
    .then((response) => {
      result = { success: true, user: response.data.body };
    })
    .catch((error) => console.log(`create user error-> ${error}`));

  return result;
}
