import React, { useEffect, useState } from "react";
import icon from "../misc/icon.png";
import { useSelector, useDispatch } from "react-redux";
import * as notebookServices from "../Services/notebookServices";
import Collapse from "react-bootstrap/Collapse";
import { Link } from "react-router-dom";

const NoteBooks = ({ history }) => {
  const notebooks = useSelector((store) => store.notebookReducer);
  const [newNotebook, changeNotebook] = useState("");
  const [open, changeOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function body() {
      try {
        const { data: array } = await notebookServices.getNotebooks();
        dispatch({ type: "loadNotebooks", payload: array });
      } catch (error) {
        if (error && error.response) {
          alert(error.response.data);
        } else history.push("/networkDown");
      }
    }
    body();
  }, []);

  const addNotebook = async () => {
    try {
      changeNotebook("");
      changeOpen(false);
      const { data: result } = await notebookServices.addNotebook(newNotebook);
      dispatch({
        type: "addNotebook",
        payload: result,
      });
    } catch (error) {
      console.log(error);
      if (error && error.response) {
        alert(error.response.data);
      } else history.push("/networkDown");
    }
  };
  const changeInput = (e) => {
    changeNotebook(e.target.value);
  };

  const removeNotebook = async (id) => {
    try {
      await notebookServices.removeNotebook(id);
      dispatch({ type: "removeNotebook", payload: id });
    } catch (error) {
      if (error && error.response) {
        if (error.response.status === 403)
          alert(
            "You need to be an admin to remove a notebook. Login with and admin account"
          );
        else alert(error.response.data);
      }
    }
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
          {notebooks.map((notebook) => (
            <div
              key={notebook._id}
              className="col col-6"
              style={{ padding: "10px" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col col-4">
                    <Link
                      to={`notes/${notebook._id}`}
                      style={{ height: "0px" }}
                    >
                      <img
                        style={{ cursor: "pointer", border: "0px" }}
                        src={icon}
                        width="75"
                        height="75"
                        className="d-inline-block align-top"
                        alt=""
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="col col-8 mt-2">
                    <div className="row">{notebook.name} </div>
                    <div className="row mt-1">
                      <i
                        onClick={() => removeNotebook(notebook._id)}
                        className="fas fa-trash ml-3"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteBooks;
