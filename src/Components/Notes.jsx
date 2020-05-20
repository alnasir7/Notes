import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Notes = ({ history, match }) => {
  const id = match.params.id;
  const notebook = useSelector((store) => store.notebookReducer)[id];

  return (
    <div style={{ position: "relative", top: 50, left: 40, width: "90%" }}>
      <span className="mr-3" style={{ fontSize: "2rem" }}>
        {notebook.name}
      </span>
    </div>
  );
};

export default Notes;
