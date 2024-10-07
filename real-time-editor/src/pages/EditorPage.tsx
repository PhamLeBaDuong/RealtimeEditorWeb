import { useCallback, useContext, useEffect, useState } from "react";
// import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "../App.css";
import { io, Socket } from "socket.io-client";
import Quill from "quill"
// import { doc, collection, onSnapshot, DocumentData, getDocFromCache, query, where, setDoc, updateDoc } from "firebase/firestore";
// import { auth, db, getFileData } from "../firebase/firebase";
import { AuthContext } from "../context/auth-context";
import { useLocation } from "react-router-dom";
import { FloatButton, Input, message, Modal } from 'antd';
import { ShareAltOutlined } from "@ant-design/icons";
import { Delta } from "quill/core";
// import {fetchSignInMethodsForEmail} from "firebase/auth";
// import {getFunctions,httpsCallable} from "firebase/functions";
const modules = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]


function EditorPage() {
  const [quill, setQuill] = useState<Quill>(null as any)
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  useEffect(() => {
    const s = io("http://localhost:5001");
    setSocket(s);

    return () => {
      s.disconnect()
    }
  },[])
  // const {currentUser} = useContext(AuthContext);
  // const currentUserId = currentUser!.uid;
  // const collectionRef = collection(db,"users",currentUserId,"files");
  let [valuee, setValuee] = useState("");
  // const {state} = useLocation();
  const [loading, setLoading] = useState(false);
  // const {fileID} = state;
  // const docRef = doc(db, "users", currentUserId,"files", fileID);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailShare, setEmailShare] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  // const functions = getFunctions();
  // const getUserIdByEmail = httpsCallable(functions, 'getUserIdByEmail');
  // const fetchUserId = async (email: string) => {
  //   try {
  //     const response = await fetch(`http://localhost:5173/getUserId?email=${email}`);
  //     const data = await response.json();
  //     console.log("User ID:", data.userId);
  //   } catch (error) {
  //     console.error("Error fetching user ID:", error);
  //   }
  // };
  // const fetchUserId = async (email: string) => {
  //   try {
  //     const result = await getUserIdByEmail({ email },);
  //     console.log("User ID:",result.data)
  //     return result.data
  //   } catch (error) {
  //     console.error("Error fetching user ID:", error);
  //   }
  // };
  // useEffect(() => {
  //   const unsub = onSnapshot(collectionRef,(querySnapshot) => {
  //     querySnapshot.forEach((docc) => {
  //       if(docc.id == fileID) {
  //         setValuee(docc.data()["filedata"])
  //         valuee = docc.data()["filedata"]
  //         return
  //       }
  //     })
  //   })
  //   return unsub

  // })

  async function updateFile(value: string) {
    setValuee(value)
    valuee = value
    // await updateDoc(docRef,{filedata: value})
  }

  const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = (newEmail: string) => { 
      // fetchSignInMethodsForEmail(auth,newEmail).then(listMethod => {
      //   if(listMethod.length == 0) {
      //     messageApi.error("Email does not exist")
      //   } 
      //   else {          
      //     try{
      //       fetchUserId(newEmail).then(shareID => {
      //         console.log(shareID)
      //       })
            setIsModalOpen(false);
        //   } catch (e) {
        //     console.error(e)
        //   }
        // }
      // }).catch((e: any) => {
      //   messageApi.error("Invalid Email")
      //   console.error(e)
      // })
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    useEffect(() => {
      if (socket == null || quill == null) return
  
      const handler = (delta: Delta) => {
        quill.updateContents(delta)
      }
      socket.on("receive-changes", handler)
  
      return () => {
        socket.off("receive-changes", handler)
      }
    }, [socket, quill])
    useEffect(() => {
      if (socket == null || quill == null) return
  
      const handler = (delta: Delta, oldDelta: Delta, source: string) => {
        if (source !== "user") return
        socket.emit("send-changes", delta)
      }
      quill.on("text-change", handler)
  
      return () => {
        quill.off("text-change", handler)
      }
    }, [socket, quill])
    const wrapperRef = useCallback((wrapper: { innerHTML: string; append: (arg0: HTMLDivElement) => void; } | null) => {
      if (wrapper == null) return
  
      wrapper.innerHTML = ""
      const editor = document.createElement("div")
      wrapper.append(editor)
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: modules },
      })
      // q.disable()
      // q.setText("Loading...")
      setQuill(q)
    }, [])



  return (
    <div className="containerr">
      <div className="wrapper" ref={wrapperRef} />
      {/* {contextHolder}
      <div style={{marginTop: "4%"}} className="row">
        <div className="editor">
          <ReactQuill
            className="editor-input"
            theme="snow"
            value={valuee}
            onChange={(value) => updateFile(value)} 
            modules={modules}
          />
        </div>
      </div> */}
      <FloatButton icon={<ShareAltOutlined />} onClick={showModal}/>
      <Modal title="Share File" open={isModalOpen} onOk={() => handleOk(emailShare)} onCancel={handleCancel}>
          <Input value={emailShare} onChange={(e) => setEmailShare(e.target.value)} placeholder="Enter share email"/>
      </Modal>
    </div>
  );
}

export default EditorPage;
