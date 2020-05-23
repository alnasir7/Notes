import React from "react";
import icon from "../misc/icon.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { username, loggedIn, role } = useSelector(
    (store) => store.loginReducer
  );

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            margin: "0px",
          }}
        >
          <div className="flex-item">
            <a className="navbar-brand" href="#">
              <img
                src={icon}
                width="55"
                height="45"
                className="d-inline-block align-top"
                alt=""
                loading="lazy"
              />
              Mohammed Notes
            </a>
          </div>
          {loggedIn ? (
            <div className="flex-item" style={{ color: "black" }}>
              Logged in as {username}
            </div>
          ) : null}
          {role === "admin" ? (
            <div className="flex-item" style={{ color: "black" }}>
              You are Admin
            </div>
          ) : null}
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
