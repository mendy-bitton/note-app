import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import RichEditor from "./RichEditor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColorPicker from "./ColorPicker";

const NewNote = ({
  handleAddNote,
  setShowPopup,
  showPopup,
  defaultText,
  id,
  defaultTitle,
  color
}) => {
  const remaining = 400;
  const [valueEditor, setValueEditor] = useState("");
  const [titleEditor, setTitleEditor] = useState("");
  const [selectedColor, setSelectedColor] = useState(color);
  const colors = ["#c1d1c6", "#ccc2b8", "#deb8ad", "#dac2d0", "#e1e1e1e1"];

  useEffect(() => {
    setValueEditor(defaultText);
    setTitleEditor(defaultTitle);
  }, []);

  const checkLimitCh = (e) => {
    if (
      convertToPlainText(valueEditor).length >= remaining &&
      e.key !== "Backspace"
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    let textLength = convertToPlainText(valueEditor).trim().length;
    let titleLength = titleEditor.trim().length;
    if (textLength > 0 && textLength <= remaining && titleLength > 0) {
      handleAddNote(
        id,
        titleEditor,
        valueEditor,
        convertToPlainText(valueEditor),
        selectedColor
      );
      setShowPopup(false);
    } else {
      if (textLength <= 0) {
        showToastMessage("you've left the note empty. Please write something to save.");
      } if (titleLength === 0) {
        showToastMessage("the title can't be empty. Please provide a title for your note.");
      } if (textLength > remaining) {
        showToastMessage("the text you've entered is too long. Please shorten your input.");
      }
    }
  };

  const convertToPlainText = (valueEditor) => {
    const div = document.createElement("div");
    div.innerHTML = valueEditor;
    return div.textContent || div.innerText || "";
  };

  const showToastMessage = (text) => {
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <div
        className={` popupNew overlay-new ${showPopup ? "show-overlay" : ""} `}
       
      >
        <div className="editor-new"  style={{backgroundColor: selectedColor}}>
          <div className="header-new">
            <label htmlFor="input" className="title-input">
              <span>Title:</span>
              <input
                defaultValue={titleEditor}
                maxLength={25}
                type="text"
                placeholder="Type Title here..."
                onChange={(e) => setTitleEditor(e.target.value)}
              />
            </label>
            <ColorPicker
              colors={colors}
              selectedColor={selectedColor}
              onSelectColor={handleColorChange}
            />
            <AiOutlineClose
              className="close-popup-icon"
              onClick={() => setShowPopup(false)}
            />
          </div>
          <RichEditor
          className="rich-editor"
            defaultText={valueEditor}
            valueEditor={valueEditor}
            setValueEditor={setValueEditor}
            checkLimitCh={checkLimitCh}
          />
          <div className="footer-new">
            <small>
              {remaining - convertToPlainText(valueEditor).length} Remaining
            </small>
            <button className="save-new" onClick={handleSubmit}>
              Save
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewNote;
