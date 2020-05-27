import http from "./httpServices";
import config from "../Configs/Configs";
import Axios from "axios";

Axios.defaults.headers.common["x-jwt"] = sessionStorage.getItem("token");
const apiEndPoint = config.apiEndPoint + "/notes";

export async function getNotes(id) {
  const result = await http.get(apiEndPoint + "/" + id);
  return result.data;
}

export async function updateNote({ _id, title, body, notebook }) {
  await http.update(apiEndPoint + "/" + _id, { title, body, notebook });
}

export async function addNote(id, { title, body }) {
  const submitObject = { title, body, notebook: id };
  await http.post(apiEndPoint, { title, body, notebook: id });
}

export async function removeNote(id) {
  await http.delete(apiEndPoint + "/" + id);
}
