import { addUser, removeUser } from "./Actions";
const initialState = { loggedIn: false, username: "", id: "", role: "" };

export default function (state = initialState, { type, payload }) {
  //const { username, id, role } = payload;
  switch (type) {
    case addUser:
      return {
        ...state,
        loggedIn: true,
        username: payload.username,
        role: payload.role,
        id: payload._id,
      };
    case removeUser:
      return { loggedIn: false, name: "", id: "", role: "" };

    default:
      return state;
  }
}
