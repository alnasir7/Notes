import React from "react";
import icon from "../misc/icon.png";

const Navbar = () => {
  console.log(window.location);
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
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
      </nav>
    </div>
  );
};

export default Navbar;
