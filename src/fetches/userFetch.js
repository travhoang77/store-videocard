const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

module.exports = {
  emailExists,
  create,
  validateCurrentPassword,
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

async function validateCurrentPassword(token, id, password) {
  let result = { success: false, message: "Invalid Password" };

  await instance
    .post(
      "/auth/validatepassword",
      { id, password },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.status === 200 && response.data.success)
        result = { success: true, message: response.data.message };
    })
    .catch((error) => {
      console.log("validateCurrentPassword ->", error);
    });
  return result;
}
