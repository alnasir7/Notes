import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Joi from "joi-browser";
import * as userService from "../Services/userServices";

const Login = () => {
  const [loginMode, changeMode] = useState(false);
  const [user, changeUser] = useState({
    username: "",
    password: "",
    rememebr: "",
    role: "admin",
  });

  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    remember: Joi.optional(),
    role: Joi.string().optional(),
  };

  const changeInput = (event) => {
    changeUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitUser = (event) => {
    event.preventDefault();
    const submitUser = {
      username: user.username,
      password: user.password,
      role: user.role,
    };
    try {
      userService.loginUser(submitUser);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <div style={{ position: "relative", top: 30, left: 40 }}>
        <h1>Login Page</h1>
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
          </div>
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
