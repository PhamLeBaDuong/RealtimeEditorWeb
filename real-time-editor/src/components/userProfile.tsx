import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { Button } from 'antd';
import "bootstrap/dist/css/bootstrap.css"
import "../App.css"

function UserProfile() {
    const { currentUser, signOut } = useContext(AuthContext);
    const navigate = useNavigate()
  
    const handleSubmit = async () => {
      signOut
      navigate("/login", {replace: true})
    };
    return(
        /**
        * Extract the currrentUser from the context, if you want to
        * get the User info, like the email, display name, etc.
        */
        <div className='user-profile'>
          <div className='top-bar'></div>
          <div className='list-files'></div>
          <div>
            <h3>Welcome! {currentUser?.email}</h3>
            <p>Sign In Status: {currentUser && 'active'}</p>
            <Button onClick={handleSubmit}>Sign Out</Button>
          </div>
        </div>
      )

}

export default UserProfile