const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

module.exports = {
  getProductsBy,
};

async function getProductsBy(type) {
  let results = { success: false, products: null };

  await instance
    .get(`/products?chipset=${type}`)
    .then((response) => {
      if (response.data.success) {
        results = { success: true, products: response.data.body };
      }
    })
    .catch((error) => {
      console.log(`getProductsBy(${type}) error-->`, error);
    });

  return results;
}
