import React, { useEffect, useState } from "react";
import icon from "../misc/icon.png";
import { useSelector, useDispatch } from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";

const NoteBooks = ({ history }) => {
  const notebooks = useSelector((store) => store.notebookReducer);
  const [newNotebook, changeNotebook] = useState("");
  const [open, changeOpen] = useState(false);
  const dispatch = useDispatch();

  const addNotebook = () => {
    dispatch({
      type: "addNotebook",
      payload: { id: notebooks.length + 2, name: newNotebook },
    });
    changeNotebook("");
    changeOpen(false);
  };
  const changeInput = (e) => {
    changeNotebook(e.target.value);
  };

  const removeNotebook = (id) => {
    dispatch({ type: "removeNotebook", payload: id });
  };

  return (
    <div style={{ position: "relative", top: 50, left: 40, width: "90%" }}>
      <span className="mr-3" style={{ fontSize: "2rem" }}>
        NoteBooks
      </span>
      <span style={{ position: "relative", left: "200px", cursor: "pointer" }}>
        <i
          style={{ cursor: "pointer" }}
          className="fas fa-plus-square fa-2x"
          onClick={() => changeOpen(!open)}
          aria-controls="addNotebook"
          aria-expanded={open}
        ></i>
      </span>
      <hr
        style={{
          border: "1px solid white",
        }}
      />
      <Collapse in={open}>
        <div id="addNotebook">
          <div className="card" style={{ width: "70%" }}>
            <input
              style={{ position: "relative" }}
              className="form-control"
              type="text"
              onChange={changeInput}
              placeholder="Enter Notebook Name"
              value={newNotebook}
            ></input>
            <button
              onClick={addNotebook}
              style={{ position: "relative" }}
              className="btn btn-primary"
            >
              Save NoteBook
            </button>
          </div>
        </div>
      </Collapse>

      <div className="container" style={{ margin: "10px" }}>
        <div className="row">
          {notebooks.map((notebook, id) => (
            <div key={id} className="col col-6" style={{ padding: "10px" }}>
              <Link to={`notes/${id}`}>
                <img
                  style={{ cursor: "pointer" }}
                  src={icon}
                  width="75"
                  height="75"
                  className="d-inline-block align-top"
                  alt=""
                  loading="lazy"
                />
              </Link>

              <div>
                {notebook.name}{" "}
                <i
                  onClick={() => removeNotebook(id + 1)}
                  className="fas fa-trash ml-3"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteBooks;
