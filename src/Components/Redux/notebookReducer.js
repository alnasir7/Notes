import { addNotebook, removeNotebook } from "./Actions";

const initialState = [
  { id: 1, name: "Mohammed" },
  { id: 2, name: "Ussaid" },
  { id: 3, name: "Sami" },
  { id: 4, name: "Karam" },
  { id: 5, name: "Zurain" },
];

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case addNotebook:
      return [...state, payload];
    case removeNotebook:
      return state.filter((element) => element.id !== payload);
    default:
      return state;
  }
}
