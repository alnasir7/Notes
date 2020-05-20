import config from "../Configs/Configs";
import axios from "axios";

export async function loginUser(user) {
  const apiPoint = config.apiEndPoint + "/users";
  try {
    await axios.post(apiPoint, user);
  } catch (error) {}
}
