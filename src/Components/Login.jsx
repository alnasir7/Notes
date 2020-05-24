import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import Joi, { read } from "joi-browser";
import * as userService from "../Services/userServices";

const Login = () => {
  const [loginMode, changeMode] = useState("register");
  const [user, changeUser] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [errors, changeErrors] = useState({});
  const [ready, changeReady] = useState({ username: false, password: false });

  const schema = {
    username: Joi.string().required().min(4).max(26),
    password: Joi.string().required().min(6).max(256),
    role: Joi.string().optional(),
  };

  const changeInput = (event) => {
    const newUser = { ...user, [event.target.name]: event.target.value };
    validate(newUser, event.target.name);
    changeUser({ ...user, [event.target.name]: event.target.value });
  };

  const validate = (newUser, property) => {
    try {
      const error = Joi.validate(newUser, schema, {
        abortEarly: false,
      }).error.details.filter((error) => error.path[0] === property);
      changeErrors({ ...errors, [property]: error[0].message });
      changeReady({ ...ready, [property]: false });
    } catch (error) {
      changeErrors({ ...errors, [property]: null });
      changeReady({ ...ready, [property]: true });
    }
  };

  const submitUser = (event) => {
    event.preventDefault();
    if (loginMode === "register") {
      try {
        userService.registerUser(user);
        userService.loginUser(user);
        window.location = "/";
      } catch (error) {
        if (error && error.reponse) {
          alert("The username or password are incorrect");
        }
      }
    } else {
      try {
        userService.loginUser(user);
        window.location = "/";
      } catch (error) {
        if (error && error.reponse) {
          alert("The username or password are incorrect");
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div style={{ position: "relative", top: 30, left: 40 }}>
        {loginMode === "login" ? <h1>Login</h1> : <h1>Register</h1>}
      </div>
      <div
        className="m-2"
        style={{
          position: "relative",
          top: 110,
          left: 20,
          width: 650,
          padding: "20px",
          border: "white solid",
        }}
      >
        <form onSubmit={submitUser}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="username"
              className="form-control"
              id="username"
              value={user.username}
              onChange={changeInput}
              autoComplete="off"
            ></input>
            {errors["username"] && (
              <div
                disabled={document.activeElement.id !== "username"}
                className="alert alert-danger"
              >
                {errors["username"]}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              autoComplete="off"
              className="form-control"
              id="password"
              value={user.password}
              onChange={changeInput}
            ></input>
            {errors["password"] && (
              <div
                hidden={document.activeElement.id !== "password"}
                className="alert alert-danger"
              >
                {errors["password"]}
              </div>
            )}
          </div>
          {loginMode === "register" ? (
            <div className="form-group mt-2">
              <label htmlFor="role">Choose Role</label>
              <select
                className="role ml-3"
                id="role"
                name="role"
                onChange={changeInput}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          ) : null}
          <button
            disabled={!(ready["username"] && ready["password"])}
            className="btn btn-primary"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="m-4" style={{ position: "relative", top: 170, left: 20 }}>
        <h3>
          <a>
            {" "}
            {loginMode === "register" ? (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => changeMode("login")}
              >
                Already have an account? Login here
              </span>
            ) : (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => changeMode("register")}
              >
                Don't have an account yet? sign up here
              </span>
            )}
          </a>
        </h3>
      </div>
    </React.Fragment>
  );
};

export default Login;
