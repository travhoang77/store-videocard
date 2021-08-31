const jwt = require("jsonwebtoken");

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserIdFromToken(token) {
  return jwt.decode(token)["_id"];
}
