import {query,collection,addDoc,Firestore,Timestamp, onSnapshot, QueryDocumentSnapshot, DocumentData, serverTimestamp, doc, setDoc, deleteDoc, getDoc, getDocs} from "firebase/firestore";
import {auth, db} from '../firebase/firebase'
import { MouseEventHandler,MouseEvent,useContext, useState, useEffect, Fragment } from "react";
import { AuthContext } from "../context/auth-context";
import {v4 as uuidv4} from "uuid";
import Model from "./modal"
import ModalComponent from "./modal";
import { Button, Row } from 'antd';

function ListFileItem () {
    const {currentUser} = useContext(AuthContext);
    const currentUserId = currentUser!.uid;
    const collectionRef = collection(db,"users",currentUserId,"files");

    
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [filedata, setFileData] = useState("");
    const [files, setFiles] = useState([] as Array<DocumentData>);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // const q = query(collectionRef);
    // const querySnapshot = await getDocs(q);

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [] as Array<DocumentData>;
            querySnapshot.forEach((doc) => {
                items.push([doc.data(),{idd:doc.id}]);        
            });
            setFiles(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };

    },[]);

    async function addFile(newFileName: string) {
        const newFile = {
            fileName,
            lastUpdate: Timestamp.now(),
            createdAt: serverTimestamp(),
            filedata,
            //id: uuidv4()
        }

        try {
            await addDoc(collectionRef,newFile);
            const temp = files as Array<DocumentData>
            temp.push(newFile)
            setFiles(temp)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Fragment>
            {loading ? <h1>Loading...</h1> : null}
            <div className="add-new-file">                
                <div>
                    <Button type="primary" onClick={showModal}>
                        {title}
                    </Button>
                    <Modal title={buttonTitle} open={isModalOpen} onOk={() => handleOKK} onCancel={handleCancel}>
                        <Input onChange={() => setNewFileName} placeholder={buttonTitle}/>
                    </Modal>                
                </div>
                <Button onClick={() => addFile()}>+</Button>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>                
                {files.length == 0 ? null : (files as Array<DocumentData>).map((file) => 
                    <div onClick={() => {}} className="file" key={file.idd}>
                        <img src="" alt="" />
                        <div>{file.fileName}</div>
                        {/* <div>{(file.lastUpdate as Timestamp).toDate().getTime()}</div> */}
                        <div>
                            <Button onClick={async () => {
                                try {
                                    const fileref = doc(db,"users",auth.currentUser?.uid!,"files",file.idd)
                                    await deleteDoc(fileref)
                                } catch (e) {
                                    console.error(e)
                                }
                            }}>x</Button>
                        </div>
                        <div>
                            <Button onClick={() => {console.log(file.idd)}}>edit</Button>
                        </div>
                    </div>
                )}
            </Row>
            <div>
            </div>            
        </Fragment>
    )
}

export default ListFileItem