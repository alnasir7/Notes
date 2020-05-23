import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import Navbar from "./NavBar";
import NoteBooks from "./NoteBooks";
import * as userService from "../Services/userServices";
import Notes from "./Notes";
import Note from "./Note";
import "bootstrap/dist/css/bootstrap.css";

const RootApp = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.loginReducer);

  useEffect(() => {
    const user = userService.getUser();
    if (user) {
      dispatch({ type: "addUser", payload: user });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Route
          path="/"
          exact
          render={(props) =>
            !currentUser.loggedIn ? (
              <Login {...props} />
            ) : (
              <NoteBooks {...props} />
            )
          }
        ></Route>
        <Route path="/notes/:id" render={(props) => <Notes {...props} />} />
        <Route path="/note/:id" render={(props) => <Note {...props} />} />
      </div>
    </BrowserRouter>
  );
};

export default RootApp;
