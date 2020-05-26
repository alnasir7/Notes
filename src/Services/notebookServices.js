import http from "./httpServices";
import config from "../Configs/Configs.json";
import Axios from "axios";

const apiEndpPoint = config.apiEndPoint + "/notebooks";
Axios.defaults.headers.common["x-jwt"] = sessionStorage.getItem("token");

export async function addNotebook(name) {
  const result = await http.post(apiEndpPoint, { name });
  return result;
}

export async function getNotebooks() {
  const result = await http.get(apiEndpPoint);
  return result;
}

export async function removeNotebook(id) {
  await http.delete(apiEndpPoint + "/" + id);
}
