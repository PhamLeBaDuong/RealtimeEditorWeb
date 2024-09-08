import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";
import { getDoc,doc, collection } from "firebase/firestore";
import { auth, getFileData } from "../firebase/firebase";

const modules = {
    toolbar: [
        [{header: [1,2,3,4,5,6,false]}],
        [{font: []}],
        [{size: []}],
        ["bold", "italic", "underline", "strike","blockquote"],
        [
            {list: "ordered"},
            {list: "bullet"},
            {indent: "-1"},
            {indent: "+1"},
        ],
        ["link", "image", "video"]
    ],
}

function EditorPage(fileID: string) {
  const [value, setValue] = useState("");
  getFileData(fileID).then((valuee) => setValue(valuee))

  return (
    <div className="container">
      <div className="row">
        <div className="editor">
          <ReactQuill
            className="editor-input"
            theme="snow"
            value={value}
            onChange={setValue} 
            modules={modules}
          />
        </div><div className="preview" dangerouslySetInnerHTML={{ __html: value}}></div>
      </div>
    </div>
  );
}

export default EditorPage;
