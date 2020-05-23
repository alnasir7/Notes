import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import notebookReducer from "./notebookReducer";
import notesReducer from "./notesReducer";

export default combineReducers({
  loginReducer,
  notebookReducer,
  notesReducer,
});
