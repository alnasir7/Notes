import React from "react";
const NotFound = ({ history }) => {
  return (
    <div
      className="container"
      style={{ position: "relative", top: 80, left: 40 }}
    >
      <h1>Error 404</h1>
      <h1>Not Found</h1>
      <button
        onClick={() => history.push("/")}
        className="btn btn-primary"
        style={{ top: 20, right: 20, position: "absolute" }}
      >
        Return
      </button>
    </div>
  );
};

export default NotFound;
