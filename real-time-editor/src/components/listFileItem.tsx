import {collection,addDoc,Firestore,Timestamp, onSnapshot, QueryDocumentSnapshot, DocumentData, serverTimestamp, doc, setDoc} from "firebase/firestore";
import {db} from '../firebase/firebase'
import { MouseEventHandler,MouseEvent,useContext, useState, useEffect, Fragment } from "react";
import { AuthContext } from "../context/auth-context";
import {v4 as uuidv4} from "uuid";

function ListFileItem () {
    const {currentUser} = useContext(AuthContext);
    const currentUserId = currentUser!.uid;
    const collectionRef = collection(db,"users",currentUserId,"files");

    
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");
    const [filedata, setFileData] = useState("");
    const [files, setFiles] = useState([] as Array<DocumentData>);

    useEffect(() => {
        setLoading(true);

        const unsub = onSnapshot(collectionRef, (querySnapshot) => {
            const items = [] as Array<DocumentData>;
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setFiles(items);
            setLoading(false);
        });
        return () => {
            unsub();
        };

    },[]);

    async function addFile() {
        const newFile = {
            fileName,
            lastUpdate: Timestamp.now(),
            createdAt: serverTimestamp(),
            filedata,
            id: uuidv4()
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
            <div className="add-new-file">
                <button onClick={() => addFile()}>+</button>
            </div>
            <div>
                {loading ? <h1>Loading...</h1> : null}
                {files.length == 0 ? null : (files as Array<DocumentData>).map((file) => 
                    <div onClick={() => {}} className="file" key={file.id}>
                        <img src="" alt="" />
                        <div>{file.fileName}</div>
                        <div>{(file.lastUpdate as Timestamp).toDate().getTime()}</div>
                        <div>
                            <button onClick={() => {}}>x</button>
                        </div>

                    </div>
                )}
            </div>
            
        </Fragment>
    )
}

export default ListFileItem