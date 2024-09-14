import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { getDoc,doc, collection, onSnapshot, DocumentData, getDocFromCache, query, where, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, getFileData } from "../firebase/firebase";
import { AuthContext } from "../context/auth-context";
import { useLocation } from "react-router-dom";

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
interface Props{
  fileID: string
}

// useEffect(() => {
//   const unsub = onSnapshot(collectionRef, (querySnapshot) => {
//     const items = [] as Array<DocumentData>;
//     querySnapshot.forEach((doc) => {
//         items.push(doc.data());
//         listID.push(doc.id);
//         //console.log(listID[listID.length-1]);
//     });
//     setListID(listID);
//     setFiles(items);
//   });
//   return () => {
//       unsub();
//   };
// })


function EditorPage() {
  const {currentUser} = useContext(AuthContext);
  const currentUserId = currentUser!.uid;
  const collectionRef = collection(db,"users",currentUserId,"files");
  let [valuee, setValuee] = useState("");
  const {state} = useLocation();
  const [loading, setLoading] = useState(false);
  const {fileID} = state;
  const docRef = doc(db, "users", currentUserId,"files", fileID);
  useEffect(() => {
    const unsub = onSnapshot(collectionRef,(querySnapshot) => {
      querySnapshot.forEach((docc) => {
        if(docc.id == fileID) {
          setValuee(docc.data()["filedata"])
          valuee = docc.data()["filedata"]
          return
        }
      })
    })
    return unsub
    
      // const docc = getDocFromCache(docRef).then(doccc => {
      //   const docdata = doccc.data;
      //   console.log(docdata)
        
      // });

  })

  async function updateFile(value: string) {
    setValuee(value)
    valuee = value
    await updateDoc(docRef,{filedata: value})
  }



  return (
    <div className="container">
      <div className="row">
        <div className="editor">
          <ReactQuill
            className="editor-input"
            theme="snow"
            value={valuee}
            onChange={(value) => updateFile(value)} 
            modules={modules}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
