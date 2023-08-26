import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Noteslist from "./Components/Noteslist";
import { AiOutlinePlus } from "react-icons/ai";
import { nanoid } from "nanoid";
import NewNote from "./Components/NewNote";
import Search from "./Components/Search";
import Footer from "./Components/Footer";

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [searchText, setSearchText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (id, title, textHtml, text, color) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: title,
      text: text,
      textHtml: textHtml,
      date: date.toLocaleDateString(),
      color: color,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const editNote = (id, title, textHtml, text, color) => {
    const date = new Date();
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: title,
          text: text,
          textHtml: textHtml,
          date: date.toLocaleDateString(),
          color: color,
        };
      }
      return note;
    });
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <span>Notes</span>
          <button className="new-btn" onClick={() => setShowPopup(!showPopup)}>
            <span>New Note</span>
            <AiOutlinePlus className="plus-icon" size={"1em"} />
          </button>
        </div>

        <Search handleSearchNote={setSearchText} />
        {showPopup && (
          <NewNote
            handleAddNote={addNote}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
            id={""}
            defaultText={""}
            defaultTitle={""}
            color={"#e1e1e1e1"}
          />
        )}
        <Noteslist
          notes={notes.filter(
            (note) =>
              note.text.toLowerCase().includes(searchText) ||
              note.title.toLowerCase().includes(searchText)
          )}
          handleDeleteNote={deleteNote}
          handleEditNote={editNote}
        ></Noteslist>
        {notes.length === 0 && (
          <h2 className="no-notes">
            You don't have any notes yet. Start by creating a new note!
          </h2>
        )}
        
      </div>
      <Footer />
    </div>
  );
};

export default App;
