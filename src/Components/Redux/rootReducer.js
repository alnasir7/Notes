import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import notebookReducer from "./notebookReducer";

export default combineReducers({
  loginReducer,
  notebookReducer,
});
