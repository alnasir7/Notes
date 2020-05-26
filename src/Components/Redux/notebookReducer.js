import {
  addNotebook,
  removeNotebook,
  emptyNotebooks,
  loadNotebooks,
} from "./Actions";

const initialState = [];

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case addNotebook:
      return [...state, payload];
    case removeNotebook:
      return state.filter((element) => element._id !== payload);
    case emptyNotebooks:
      return [];
    case loadNotebooks:
      return payload;
    default:
      return state;
  }
}
