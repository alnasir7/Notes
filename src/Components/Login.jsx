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
    role: "user",
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

  const handlePageMode = (newMode) => {
    changeMode(newMode);
    changeUser({
      username: "",
      password: "",
      role: "user",
    });
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

  const submitUser = async (event) => {
    event.preventDefault();
    if (loginMode === "register") {
      try {
        await userService.registerUser(user);
        console.log("ok reg");
        await userService.loginUser(user);
        console.log("ok log");
        window.location = "/";
      } catch (error) {
        console.log(error);
        if (error && error.response) {
          if (error.response.status === 400)
            changeErrors({
              ...errors,
              username: "Invalid Username or Passowrd",
            });
          else {
            alert(error.response.data);
          }
        }
      }
    } else {
      try {
        await userService.loginUser(user);
        window.location = "/";
      } catch (error) {
        if (error && error.response) {
          if (error.response.status === 400)
            changeErrors({
              ...errors,
              username: "Invalid Username or Passowrd",
            });
          else {
            alert(error.response.data);
          }
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
                <option value="user">User</option>
                <option value="admin">Admin</option>
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
                onClick={() => handlePageMode("login")}
              >
                Already have an account? Login here
              </span>
            ) : (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handlePageMode("register")}
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
