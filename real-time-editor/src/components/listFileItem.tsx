import {collection,addDoc,Firestore,Timestamp, onSnapshot, QueryDocumentSnapshot, DocumentData, serverTimestamp, doc, setDoc, deleteDoc, getDoc, getDocs} from "firebase/firestore";
import {auth, db, storage} from '../firebase/firebase'
import { MouseEventHandler,MouseEvent,useContext, useState, useEffect, Fragment } from "react";
import { AuthContext } from "../context/auth-context";
// import {v4 as uuidv4} from "uuid";
// import Model from "./modal";
// import ModalComponent from "./modal";
import { Button, Input, Modal, Row,Image } from 'antd';
import "../App.css"
import { FileWordOutlined } from "@ant-design/icons";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import EditorPage from "../pages/EditorPage";
import { useNavigate } from "react-router-dom";

function ListFileItem () {
    const {currentUser} = useContext(AuthContext);
    const currentUserId = currentUser!.uid;
    const collectionRef = collection(db,"users",currentUserId,"files");
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [filedata, setFileData] = useState("");
    const [newFileName, setNewFileName] = useState("");
    const [files, setFiles] = useState([] as Array< DocumentData>);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEditor, setIsModalOpenEditor] = useState(false);
    let [listID, setListID] = useState([] as Array<string>);
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([] as Array<string>);
    const navigate = useNavigate()

    
    // const q = query(collectionRef);
    // const querySnapshot = await getDocs(q);

    useEffect(() => {
        getDataa()
        getDocImage()
    },[]);
    // const getData = () => {  
    // }
    function getDocImage() {
        listAll(ref(storage,"docImageFolder/")).then(imgs=> {
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setImgUrl(data=>[...data,url])
                })
            })
        })
    }
    function getDataa() {  
        //setListID([] as Array<string>);
        listID = [];
        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [] as Array<DocumentData>;
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                listID.push(doc.id);
                //console.log(listID[listID.length-1]);
            });
            setListID(listID);
            setFiles(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };
    }
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = async (newFileName: string) => { 
        addFile(newFileName);
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const showModalEditor = () => {
          setIsModalOpenEditor(true);
        };
      
        const handleOkEditor = async () => {
          setIsModalOpenEditor(false);
        };
      
        const handleCancelEditor = () => {
          setIsModalOpenEditor(false);
        };


    async function addFile(newFileName: string) {
        const newFile = {
            fileName: newFileName,
            lastUpdate: Timestamp.now(),
            createdAt: serverTimestamp(),
            filedata,
            //id: uuidv4()
        }

        try {
            await addDoc(collectionRef,newFile);
            getDataa()
            setNewFileName("");
            // const temp = files as Array<DocumentData>
            // temp.push(newFile)
            // setFiles(temp)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Fragment>
            {loading ? <h1>Loading...</h1> : null}
            <div className="add-new-file">                
                <div className="addDocModal">
                    <Button onClick={showModal}>
                        Add new Document
                    </Button>
                    <Modal title="Enter new Document Title" open={isModalOpen} onOk={() => handleOk(newFileName)} onCancel={handleCancel}>
                        <Input value={newFileName} onChange={e => setNewFileName(e.target.value)} placeholder="Enter new Title"/>
                    </Modal>
                </div>
                {/* <Button onClick={() => addFile()}>+</Button> */}
            </div>
            <Row style={{marginLeft: "3%"}} className="file-list" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {
                (files as Array<DocumentData>).map((file, i) => 
                    <div onClick={() => {
                        navigate('/editor-page',{state: {fileID: listID[i]}})
                    }} className="file" key={i}>
                        <Image onClick={showModalEditor} src={imgUrl.at(0)} width={100} preview={false}/>
                        <div className="fileName" style={{marginLeft: "auto",marginRight: "auto", display: "flex",justifyContent: "center"}}>{file.fileName}</div>
                        {/* <div>{(file.lastUpdate as Timestamp).toDate().getTime()}</div> */}
                        <div className="deleteButton">
                            <Button onClick={async () => {
                                try {
                                    const fileref = doc(db,"users",auth.currentUser?.uid!,"files",listID[i])
                                    await deleteDoc(fileref)
                                    console.log(listID[i])
                                } catch (e) {
                                    console.error(e)
                                }
                            }} block>x</Button>
                        </div>
                        {/* <div className="editButton">
                            <Button onClick={() => {
                                console.log(listID[i])
                            }}>edit</Button>
                        </div> */}
                    </div>
                )}
            </Row>
            <div>
            </div>            
        </Fragment>
    )
}

export default ListFileItem