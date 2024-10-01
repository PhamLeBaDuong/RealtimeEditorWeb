
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import reactLogo from '.././assets/react.svg'
// import { signInUser } from '../firebase/firebase'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import {AuthContext} from '../context/auth-contextPSQL'
import {toast} from "react-toastify"

const defaultFormFields = {
  email: '',
  password: '',
}

type SetAuthType = (boool: boolean) => void;

interface LoginProps {
  setAuth: SetAuthType;
}

function Login() {
  const {setAuthenticated} = useContext(AuthContext)!;
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  // const navigate = useNavigate()

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        // setAuth(true);
        setAuthenticated(true);
        toast.success("Logged in Successfully");
      } else {
        // setAuth(false);
        setAuthenticated(false);
        toast.error(parseRes);
      }
      // await login(email, password);
      // const userCredential = await signInUser(email, password)

      // if (userCredential) {
      //   resetFormFields()
      //   navigate('/homepage')
      // }
    } catch (error:any) {
      console.log('User Sign In Failed', error.message);
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
          <div>Didn't have an account?<Link to={"/signup"}>Sign Up</Link></div>
          <div>
            <input id='recaptcha' type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
