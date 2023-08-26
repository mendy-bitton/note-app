import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    
    [
      {
        color: ["red", "green","blue", "yellow", "grey", "brown", "orange"],
      }
    ],
    
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
};

const RichEditor = ({
  valueEditor,
  setValueEditor,
  checkLimitCh,
  defaultText,
}) => {
  useEffect(() => {
    if (defaultText !== "") {
      setValueEditor(defaultText);
    }
  }, []);

  return (
    <div className="container-editor">
      <div className="row-editor">
        <div className="editor">
          <ReactQuill
            onKeyDown={checkLimitCh}
            placeholder={"Type Here..."}
            theme="snow"
            value={valueEditor}
            onChange={setValueEditor}
            className="editor-input"
            modules={modules}
          />
        </div>
      </div>
    </div>
  );
};

export default RichEditor;
