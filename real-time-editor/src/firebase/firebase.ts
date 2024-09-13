import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
  signInWithPopup

} from 'firebase/auth';
import { getFirebaseConfig } from './firebase-config';

import {collection,addDoc,Firestore,getFirestore,documentId,doc,where,FieldPath, getDoc} from "firebase/firestore";
import firebase from 'firebase/compat/app';
//import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth/web-extension';
import {v4 as uuidv4} from "uuid"
import { getStorage, ref } from 'firebase/storage';

const app = initializeApp(getFirebaseConfig());
export const auth = getAuth(app);
let userEmail = "";
export const db = getFirestore(app);
export const storage = getStorage(app);
export const docimgRef = ref(storage,"docImage.png");
let userID = "";

export const signInUser = async (
  email: string, 
  password: string
) => {
  if (!email && !password) return;

  // where(collection(db,"users"),"==",email)
  
  return await signInWithEmailAndPassword(auth, email, password)
}

// const addNewUser = async (
//   email: string,
//   password: string
// ) => {
//   await createUserWithEmailAndPassword(auth, email, password)
//   await addDoc(collection(db,"users"),{
//     email: email,
//     password: password,
//     userid: userID
//   })
// }

export const signUpUser = async (
  email: string,
  password: string
) => {
  if (!email && !password) return;  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const getFileData = async (fileID: string) => {
  //doc(db,"users",auth.currentUser?.uid,"files",fileID)
  return (await getDoc(doc(db,"users",auth.currentUser?.uid!,"files",fileID))).data.toString
  //where(doc(db,"users",auth.currentUser?.uid,"files",fileID),"==",fileID)
}

// export const signInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth,provider);
//   return result;
// }

export const userStateListener = (callback:NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback)
}

export const SignOutUser = async () => await signOut(auth);

export const addNewDocument = async () => await addDoc(collection(db,"users",userID,"files"),{})