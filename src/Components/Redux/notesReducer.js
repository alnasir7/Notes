import { addNote, removeNote, emptyNotes, loadNotes } from "./Actions";

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
    default:
      return state;
  }
}
