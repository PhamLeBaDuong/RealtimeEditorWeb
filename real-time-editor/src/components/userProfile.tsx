import { useContext, useEffect, useState } from 'react'
// import { AuthContext } from '../context/auth-context'
import { AuthContext } from '../context/auth-contextPSQL'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { Button } from 'antd';
import "bootstrap/dist/css/bootstrap.css"
import "../App.css"
import { toast } from 'react-toastify';
type SetAuthType = (boool: boolean) => void;

interface UserProfileProps {
  setAuth: SetAuthType;
}
function UserProfile() {
  const { setAuthenticated} = useContext(AuthContext);
  // const { user,logout } = useContext(AuthContext)!;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/homepage", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.name);
      setEmail(parseData.email);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      // setAuth(false);
      setAuthenticated(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return(
      /**
      * Extract the currrentUser from the context, if you want to
      * get the User info, like the email, display name, etc.
      */
      <div className='user-profile container mt-5'>
        <div className='top-bar'></div>
        <div className='list-files'></div>
        <div style={{marginLeft: "auto", marginRight: "auto"}} className='profile'>
        {/* <h3 className='name'>Welcome! {currentUser?.email}</h3> */}
        <h3 className='name text-center'>Welcome! {name}</h3>
          <p className='status text-center'>Sign In Status: {email + ' && active'}</p>
          <button className='btn' onClick={logout}>Sign Out</button>
        </div>
      </div>
    )

}

export default UserProfile