import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Navbar from "./NavBar";
import NoteBooks from "./NoteBooks";
import Notes from "./Notes";
import "bootstrap/dist/css/bootstrap.css";

const RootApp = () => {
  const LoggedIn = true;
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Route
          path="/"
          exact
          render={(props) =>
            !LoggedIn ? <Login {...props} /> : <NoteBooks {...props} />
          }
        ></Route>
        <Route path="/notes/:id" render={(props) => <Notes {...props} />} />
      </div>
    </BrowserRouter>
  );
};

export default RootApp;
