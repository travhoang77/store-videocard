require("dotenv").config();
const axios = require("axios");

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export async function getProductBy(id) {
  let result = { success: false, product: null };

  await instance
    .get(`/productService/${id}`)
    .then((response) => {
      if (response.data.success)
        result = { success: true, product: response.data.body };
    })
    .catch((error) => {
      console.log(`getProductBy(${id}) error-->`, error);
    });

  return result;
}

export async function getProductsBy(type) {
  let results = { success: false, products: null };

  await instance
    .get(`/productService?chipset=${type}`)
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
