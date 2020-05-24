import http from "./httpServices";
import config from "../Configs/Configs.json";
import Axios from "axios";
import jwt_decode from "jwt-decode";

const apiEndpPoint = config.apiEndPoint + "/notebooks";
Axios.defaults.headers.common["x-jwt"] = sessionStorage.getItem("token");

export async function addNotebook(name) {
  try {
    const result = await http.post(apiEndpPoint, { name });
    return result;
  } catch (error) {
    if (error.response) {
    } else {
      alert("An unexpected error occured");
    }
  }
}

export async function getNotebooks() {
  try {
    const result = await http.get(apiEndpPoint);
    return result;
  } catch (error) {}
}

export async function removeNotebook(id) {
  await http.delete(apiEndpPoint + "/" + id);
}
