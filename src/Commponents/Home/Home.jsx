import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
export default function Home() {
  let baseUrl = "https://route-egypt-api.herokuapp.com/";
  let token = localStorage.getItem("token");
  let decoded = jwt_decode(token);
  let userID = decoded._id;
  const [note, setNote] = useState({
    title: "",
    desc: "",
    userID,
    token,
  });
  const [notes, setNotes] = useState([]);

  function getNote({ target }) {
    setNote({ ...note, [`${target.name}`]: target.value });
  }
  async function addNote(e) {
    e.preventDefault();
    let { data } = await axios.post(baseUrl + "addNote", note);
    if (data.message === "success") {
      document.getElementById("add-form").reset();
      getUserNotes();
    }
  }
  async function getUserNotes() {
    let { data } = await axios.get(baseUrl + "getUserNotes", {
      headers: {
        userID,
        Token: token,
      },
    });
    if (data.message === "success") {
      setNotes(data.Notes);
    }
  }
  async function deletedNote(NoteID) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseUrl + "deleteNote", {
            data: {
              NoteID,
              token,
            },
          })
          .then((respons) => {
            if (respons.data.message === "deleted") {
              getUserNotes();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: respons.data.message,
              });
            }
          });
      }
    });
  }
  function getNoteData(index) {
    console.log("00");
    document.querySelector("#exampleModal1 input").value = notes[index].title;
    document.querySelector("#exampleModal1 textarea").value = notes[index].desc;
    setNote({
      ...note,
      title: notes[index].title,
      desc: notes[index].desc,
      NoteID: notes[index]._id,
    });
  }
  async function updataNote(e) {
    e.preventDefault();
    console.log(note);
    let { data } = await axios.put(baseUrl + "updateNote", note);
    if (data.message === "updated") {
      Swal.fire(
        'updated!',
        'Your note has been updated.',
        'success'
      )
      getUserNotes();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong!",
        
      })
    }
    console.log(data);
  }
  useEffect(() => {
    getUserNotes();
  }, []);
  return (
    <>
      <div className="container py-3 my-4">
        {/* // Button trigger modal  */}
        <div className="d-flex justify-content-end my-4">
          <button
            type="button"
            className="btn btn-secondary add"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa-solid fa-circle-plus"></i> Add New
          </button>
        </div>
        {/* <!-- Add Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form id="add-form" onSubmit={addNote}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder="Type Title"
                    onChange={getNote}
                  />
                  <textarea
                    name="desc"
                    className="form-control my-3"
                    id="desc"
                    placeholder="Type your Note"
                    cols="30"
                    rows="10"
                    onChange={getNote}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary text-black">
                    <i className="fa-solid fa-circle-plus"></i> Add Note
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/*   Eidat modal   */}
        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form id="edite-form" onSubmit={updataNote}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder="Type Title"
                    onChange={getNote}
                  />
                  <textarea
                    name="desc"
                    className="form-control my-3"
                    id="desc"
                    placeholder="Type your Note"
                    cols="30"
                    rows="10"
                    onChange={getNote}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="row my-3">
          {notes.map((note, index) => {
            return (
              <div key={index} className="col-md-4 ">
                <div className="note p-3 my-3 position-relative">
                  <h3>{note.title}</h3>
                  <div className="btns position-absolute top-0 end-0 py-3">
                    <a
                      className="text-black"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                    >
                      <i
                        onClick={() => {
                          getNoteData(index);
                        }}
                        className="fas fa-edit fa-lg edit"
                      ></i>
                    </a>
                    <a
                      className="text-black mx-2"
                      onClick={() => {
                        deletedNote(note._id);
                      }}
                    >
                      <i className="fas fa-trash-alt fa-lg px-2 del"></i>
                    </a>
                  </div>

                  <p>{note.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
