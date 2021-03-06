import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as noteServices from "../Services/noteServices";
import queryString from "query-string";
import { useEffect } from "react";

const Note = ({ props, history, match, location }) => {
  const { notebookId } = queryString.parse(location.search);
  const dispatch = useDispatch();
  const editable = true;

  const [currentNote, changeNote] = useState(
    useSelector((store) => store.notesReducer).filter((note) => {
      if (note) return note._id == match.params.id;
    })[0] || { body: "", title: "", notebook: "" }
  );

  const changeInput = (e) => {
    changeNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const body = async () => {
      try {
        const data = await noteServices.getNotes(notebookId);
        dispatch({ type: "loadNotes", payload: data });
      } catch (error) {
        if (error && error.response) alert(error.response.data);
      }
    };
    body();
  }, []);

  const saveNote = async (id) => {
    if (match.params.id !== "new" && editable) {
      try {
        const result = await noteServices.updateNote(currentNote);
        console.log(result);
        dispatch({ type: "udpateNote", payload: result });
        history.push("/notes/" + currentNote.notebook);
      } catch (error) {
        console.log(error);
        if (error && error.response) {
          alert(error.response.data);
        } else history.push("/networkDown");
      }
    }
    if (match.params.id === "new") {
      try {
        const result = await noteServices.addNote(notebookId, currentNote);
        // dispatch({ type: "addNote", payload: result });
        history.push("/notes/" + notebookId);
      } catch (error) {
        if (error && error.response) {
          alert(error.response.data);
        } else history.push("/networkDown");
      }
    }
  };

  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          position: "relative",
          top: "50px",
          left: "0px",
          color: "black !important",
        }}
      >
        <div className="card">
          <div className="card-header" style={{ color: "black" }}>
            {editable ? (
              <textarea
                type="text"
                placeholder="Enter title here"
                rows="1"
                value={currentNote.title}
                onChange={changeInput}
                name="title"
                style={{ height: "100%", width: "100%" }}
              ></textarea>
            ) : (
              currentNote.title
            )}
          </div>
          <div className="card-body" style={{ color: "black" }}>
            {editable ? (
              <div>
                <textarea
                  type="text"
                  rows="5"
                  value={currentNote.body}
                  style={{ height: "100%", width: "100%" }}
                  onChange={changeInput}
                  name="body"
                ></textarea>
                <button
                  onClick={() => saveNote(currentNote._id)}
                  className="btn btn-primary"
                >
                  Save Note
                </button>
              </div>
            ) : (
              <p>{currentNote.body}</p>
            )}
          </div>
        </div>
      </div>
      <button
        style={{ position: "absolute", top: 75, right: 5 }}
        onClick={() => {
          history.push(`/notes/${currentNote.notebook || notebookId}`);
        }}
        className="btn btn-primary"
      >
        Go Back
      </button>
    </React.Fragment>
  );
};

export default Note;
