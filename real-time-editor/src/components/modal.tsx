import React, { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import { Input } from 'antd';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/auth-context';

type prop = {
  title: string;
  buttonTitle: string;
  handleOKK: Promise<void>
}

const ModalComponent: React.FC<prop> = ({title,buttonTitle, handleOKK}:prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const {currentUser} = useContext(AuthContext);
  const currentUserId = currentUser!.uid;
  const filedata = "";
  const collectionRef = collection(db,"users",currentUserId,"files");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
  //   const newFile = {
  //       newFileName,
  //       lastUpdate: Timestamp.now(),
  //       createdAt: serverTimestamp(),
  //       filedata,
  //       //id: uuidv4()
  //   }
  //   try {
  //     await addDoc(collectionRef,newFile);
  //     const temp = files as Array<DocumentData>
  //     temp.push(newFile)
  // } catch (e) {
  //     console.error(e)
  // }
    
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {title}
      </Button>
      <Modal title={buttonTitle} open={isModalOpen} onOk={() => handleOKK} onCancel={handleCancel}>
        <Input onChange={() => setNewFileName} placeholder={buttonTitle}/>
      </Modal>
    </>
  );
};

export default ModalComponent;