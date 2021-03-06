import {
  addNote,
  removeNote,
  emptyNotes,
  loadNotes,
  updateNote,
} from "./Actions";

const initial_state = [];

export default function (state = initial_state, { type, payload }) {
  switch (type) {
    case addNote:
      return [...state, payload];
    case removeNote:
      return state.filter((element) => {
        return element._id !== payload;
      });
    case emptyNotes:
      return [];
    case loadNotes:
      return payload;
    case updateNote:
      return [
        ...state.filter((element) => element._id !== payload._id),
        payload,
      ];

    default:
      return state;
  }
}
