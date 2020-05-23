import { addNote, removeNote, emptyNotes } from "./Actions";

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
    default:
      return state;
  }
}
