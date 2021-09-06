import store from "../redux/store";
const jwt = require("jsonwebtoken");

export function getToken() {
  const state = store.getState();
  return state.login.token;
}

export function getUserIdFromToken(token) {
  return jwt.decode(token)["_id"];
}

export function updateObject(oldObj, newObj) {
  let keys = Object.keys(newObj);

  keys.map((x) => {
    oldObj[x] = newObj[x];
  });

  return oldObj;
}

export function valueExists(prop, value, data) {
  return data.find((x) => x[prop] === value);
}

export function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function moveItemToFront(prop, value, data) {
  data.sort(function (x, y) {
    return x[prop] === value ? -1 : y[prop] === data ? 1 : 0;
  });
}
