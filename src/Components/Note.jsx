import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import NewNote from "./NewNote";

const Note = ({
  id,
  title,
  text,
  textHtml,
  date,
  color,
  handleDeleteNote,
  handleEditNote,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="note" style={{ backgroundColor: color }}>
      <div className="header-note">
        <div className="title-note">{title}</div>
        <div className="text-note">
          <small>{date}</small>
          <div>{text}</div>
        </div>
      </div>

      <div className="footer-note">
        <div className="btns-note">
          <BiFullscreen
            onClick={() => setShowPreview(true)}
            className="fullScreen-icon"
            size={"1.5em"}
          />
          <AiFillEdit
            onClick={() => setShowPopup(!showPopup)}
            className="edit-icon"
            size={"1.5em"}
          />

          {showPopup && (
            <NewNote
              id={id}
              defaultText={textHtml}
              defaultTitle={title}
              handleAddNote={handleEditNote}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
              color={color}
            />
          )}
          <div
            className={` popupNew overlay-new ${
              showPreview ? "show-overlay" : ""
            } `}
          >
            <div
              className="container-preview"
              style={{ backgroundColor: color }}
            >
              <div className="header-preview">
                <AiOutlineClose
                  className="close-preview-icon"
                  onClick={() => setShowPreview(false)}
                />
              </div>

              <div className="main-note-preview">
                <div className="title-note-preview">{title}</div>
                <div
                  className="text-note-preview"
                  dangerouslySetInnerHTML={{ __html: textHtml }}
                ></div>
              </div>
            </div>
          </div>

          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size={"1.5em"}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
