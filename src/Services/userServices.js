import config from "../Configs/Configs";
import axios from "axios";
import http from "./httpServices";
import jwt_decode from "jwt-decode";

export async function loginUser(user) {
  const apiPoint = config.apiEndPoint + "/logins";
  try {
    const headers = await http.post(apiPoint, user);
    const token = headers.headers["x-jwt"];
    sessionStorage.setItem("token", token);
  } catch (error) {}
}

export async function registerUser(user) {
  const apiPoint = config.apiEndPoint + "/users";
  const result = {};
  try {
    result = await http.post(apiPoint, user);
  } catch (error) {}
}

export function getUser() {
  const token = sessionStorage.getItem("token");

  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
}
