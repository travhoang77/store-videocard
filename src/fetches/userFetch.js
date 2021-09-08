const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

module.exports = {
  emailExists,
  create,
  validateCurrentPassword,
  updatePassword,
  getAddressesFromUser,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddressFromUser,
  setDefaultShipppingAddressById,
};

async function emailExists(email) {
  let result = { success: false, message: "Email does not exists" };

  await instance
    .get(`/authService/doesEmailExists/${email}`)
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
    .post("/userService/addUser", user)
    .then((response) => {
      if (response.status === 200 && response.data.success)
        result = { success: true, user: response.data.body };
    })
    .catch((error) => console.log(`create user error-> ${error}`));

  return result;
}

async function validateCurrentPassword(token, id, password) {
  let result = { success: false, message: "Invalid Password" };

  await instance
    .post(
      "/authService/validatePassword",
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

async function updatePassword(token, id, password) {
  let result = { success: false, message: null };

  await instance
    .post(
      "/userService/updatePassword",
      { id, password },
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.status === 200)
        result = {
          success: response.data.success,
          message: response.data.message,
        };
    })
    .catch((error) => {
      console.log("updatePassword ->", error);
    });
  return result;
}

async function createAddress(userid, token, address) {
  let result = { success: false, addresses: null };

  await instance
    .post(`/userService/${userid}/createAddress`, address, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data.success)
        result = { success: true, addresses: response.data.addresses };
    })
    .catch((error) => console.log(`createAddress error-> ${error}`));

  return result;
}

async function updateAddress(userid, token, address) {
  let result = { success: false, addresses: null };

  await instance
    .put(`/userService/${userid}/updateAddressById/${address._id}`, address, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data.success)
        result = {
          success: response.data.success,
          address: response.data.address,
        };
    })
    .catch((error) => console.log(`createAddress error-> ${error}`));

  return result;
}

async function getAddressById(userid, token, addressid) {
  let result = { success: false, message: "Address could not be retrieved" };

  await instance
    .get(`/userService/${userid}/getAddressById/${addressid}`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data.success)
        result = {
          success: response.data.success,
          address: response.data.address,
        };
    })
    .catch((error) => {
      console.log("getAddressById ->", error);
    });
  return result;
}

async function getAddressesFromUser(userid, token) {
  let result = {
    success: false,
    message: "Addresses could not be retrieved",
  };

  await instance
    .get(`/userService/${userid}/getAddresses`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data.success)
        result = {
          success: response.data.success,
          addresses: response.data.addresses,
        };
    })
    .catch((error) => {
      console.log("getAddressesFromUser ->", error);
    });
  return result;
}

async function deleteAddressFromUser(addressid, userid, token) {
  let result = {
    success: false,
    message: "Unable to delete Address",
  };

  await instance
    .delete(`/userService/${userid}/deleteAddressById/${addressid}`, {
      headers: {
        authorization: token,
      },
    })
    .then((response) => {
      if (response.data.success)
        result = response.data.success
          ? {
              success: response.data.success,
              addresses: response.data.addresses,
            }
          : {
              success: response.data.success,
              message: response.data.message,
            };
    })
    .catch((error) => {
      console.log("deleteAddressFromUser ->", error);
    });
  return result;
}

async function setDefaultShipppingAddressById(id, userid, token) {
  let result = {
    success: false,
    message: "Unable to set default shipping address",
  };

  await instance
    .put(
      `/userService/${userid}/setDefaultShippingAddressById/${id}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    )
    .then((response) => {
      if (response.data.success)
        result = response.data.success
          ? {
              success: response.data.success,
              addresses: response.data.addresses,
            }
          : {
              success: response.data.success,
              message: response.data.message,
            };
    })
    .catch((error) => {
      console.log("setDefaultShipppingAddressById ->", error);
    });
  return result;
}
