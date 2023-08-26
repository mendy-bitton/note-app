import React from "react";
import Note from "./Note";

const Noteslist = ({
  notes,
  handleDeleteNote,
  handleEditNote,
  showPopup,
  setShowPopup,
}) => 
{
  return (
    <div className="notes-list">
      {notes.map((note, index) => (
        <Note
          id={note.id}
          title={note.title}
          text={note.text}
          textHtml={note.textHtml}
          date={note.date}
          color={note.color}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          key={index}
        />
      ))}
    </div>
  );
};

export default Noteslist;
