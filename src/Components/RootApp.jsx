import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import Navbar from "./NavBar";
import NoteBooks from "./NoteBooks";
import notFound from "./NotFound";
import NetworkDown from "./NetworkDown";
import * as userService from "../Services/userServices";
import * as notebookServices from "../Services/notebookServices";

import Notes from "./Notes";
import Note from "./Note";
import "bootstrap/dist/css/bootstrap.css";

const RootApp = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.loginReducer);

  useEffect(() => {
    async function body() {
      try {
        const user = await userService.getUser();
        if (user) {
          dispatch({ type: "addUser", payload: user });
        }
      } catch (error) {}
      try {
        const { data: array } = await notebookServices.getNotebooks();
        dispatch({ type: "loadNotebooks", payload: array });
      } catch (error) {}
    }
    body();
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
        <Route path="/notFound" component={notFound} />
        <Route path="/NetworkDown" component={NetworkDown} />
        <Route path="/notes/:id" render={(props) => <Notes {...props} />} />
        <Route path="/note/:id" render={(props) => <Note {...props} />} />
      </div>
    </BrowserRouter>
  );
};

export default RootApp;
