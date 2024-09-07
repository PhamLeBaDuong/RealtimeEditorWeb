import { ChangeEvent, FormEvent, useState } from 'react'
import reactLogo from '.././assets/react.svg'
import { auth, db, signInUser, signUpUser } from '../firebase/firebase'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { User } from "firebase/auth";
import { addDoc, collection, updateDoc, where, doc } from 'firebase/firestore'

const defaultFormFields = {
  email: '',
  password: '',
}

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const navigate = useNavigate()

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Send the email and password to firebase
      const userCredential = await signUpUser(email, password)

      if (userCredential) {
        resetFormFields()
        navigate('/homepage')
      }
    } catch (error:any) {
      console.log('User Sign Up Failed', error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value })
  }

  return(
    <div className="App">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div>Already have an account?<Link to={"/login"}>Login</Link></div>
          <div>
            <input id='recaptcha' type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
// import React, { useState } from "react";
// import "D:/RealtimeEditorWeb/real-time-editor/src/App.css";
// import { Link } from "react-router-dom";
// import "../firebase/firebase";
// //import {firebaseApp,auth} from "D:/RealtimeEditorWeb/real-time-editor/src/Firebase";
// function SignUp() {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e:any) => {
//         e.preventDefault()
//         try {
//             auth.createUserWithEmailAndPassword(email, password)
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     return (
//         <div className="signup-container">
//             <form className="signup-form" onSubmit={handleSubmit}>
//                 <h2> Sign Up</h2>
//                 <label htmlFor="email">
//                     Email:
//                     <input type="text" onChange={(e) => setEmail(e.target.value)}/>
//                 </label>
//                 <label htmlFor="password">
//                     Password
//                     <input type="password" onChange={(e) => setPassword(e.target.value)}/>
//                 </label>
//                 <button type="submit">Sign Up</button>
//                 <p>Already Registered? <Link to={"/login"}>Login</Link></p>
//             </form>
//         </div>
//     )
// }
// export default SignUp;