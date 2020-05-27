import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import icon from "../misc/notesIcon.png";
import { Link } from "react-router-dom";
import * as noteServices from "../Services/noteServices";
import * as notebookServices from "../Services/notebookServices";
import { useEffect } from "react";

const Notes = ({ history, match }) => {
  const dispatch = useDispatch();
  const id = match.params.id;
  const notebooks = useSelector((store) => store.notebookReducer);
  const notebook = notebooks.filter((notebook) => notebook._id === id)[0];
  const notes = useSelector((store) => store.notesReducer);
  if (notebooks.length > 0 && !notebook) {
    history.push("/notFound");
  }

  useEffect(() => {
    async function body() {
      try {
        const data = await noteServices.getNotes(id);
        dispatch({ type: "loadNotes", payload: data });
      } catch (error) {
        if (error && error.response) alert(error.response.data);
        else history.push("/networkDown");
      }
      try {
        const { data: array } = await notebookServices.getNotebooks();
        dispatch({ type: "loadNotebooks", payload: array });
      } catch (error) {
        if (error && error.response) alert(error.response.data);
        else history.push("/networkDown");
      }
    }
    body();
  }, []);

  const removeNote = (id) => {
    noteServices.removeNote(id);
    dispatch({ type: "removeNote", payload: id });
    history.replace("/notes/" + match.params.id);
  };

  return (
    <React.Fragment>
      {notes.length && notebook ? (
        <div>
          <div
            style={{ position: "relative", top: 50, left: 40, width: "90%" }}
          >
            <span className="mr-3" style={{ fontSize: "2rem" }}>
              {notebook.name}
            </span>
            <span className="ml-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  history.push("/note/new?notebookId=" + id);
                }}
              >
                Add a Note
              </button>
            </span>
          </div>
          <div
            className="container"
            style={{
              overflowY: "scrollable",
              position: "relative",
              bottom: 20,
              top: 80,
              left: 0,
              width: "100%",
              height: "70%",
              marginLeft: "25px",
              marginRight: "25px",
            }}
          >
            <hr
              style={{
                border: "1px solid white",
              }}
            />
            {notes.map((note) => (
              <div style={{ overflowY: "scrollable" }}>
                <div className="container">
                  <div className="row">
                    <div className="col col-2">
                      <img
                        style={{ cursor: "pointer", border: "0px" }}
                        src={icon}
                        width="70"
                        height="70"
                        className="d-inline-block align-top mr-2"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="col col-10">
                      <div className="row mb-3">
                        <div
                          className="container"
                          style={{
                            padding: "0px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="flexItem">{note.title}</div>
                          <div className="flex-item clickable">
                            <Link to={`/note/${note._id}?notebookId=${id}`}>
                              <i className="fas fa-edit"></i>
                            </Link>
                          </div>
                          <div
                            className="flex-item clickable "
                            onClick={() => removeNote(note._id)}
                          >
                            <i class="fas fa-trash"></i>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <p
                          style={{
                            fontSize: "0.5 erm",
                            color: "rgba(141, 145, 136, 0.74)",
                          }}
                        >
                          {note.body.slice(0, 125)} . . .{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr
                  style={{
                    border: "1px solid white",
                  }}
                />
              </div>
            ))}
          </div>{" "}
        </div>
      ) : (
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            top: 150,
            position: "relative",
            alignItems: "center",
          }}
        >
          <div className="flex-item">
            <h1>No Notes are Found</h1>
          </div>
          <div className="flex-item mt-5">
            <button
              onClick={() => history.push("/note/new?notebookId=" + id)}
              className="btn btn-primary"
            >
              Add Notes
            </button>
          </div>
        </div>
      )}

      <div style={{ position: "absolute", top: 75, right: 5 }}>
        <button
          onClick={() => {
            history.replace("/");
          }}
          className="btn btn-primary"
        >
          Back to Notebooks
        </button>
      </div>
    </React.Fragment>
  );
};

export default Notes;
