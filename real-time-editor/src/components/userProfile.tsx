import { useContext } from 'react'
// import { AuthContext } from '../context/auth-context'
import { AuthContext } from '../context/auth-contextPSQL'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import { Button } from 'antd';
import "bootstrap/dist/css/bootstrap.css"
import "../App.css"

function UserProfile() {
  // const { currentUser, signOut } = useContext(AuthContext);
  const { user,logout } = useContext(AuthContext)!;
    const navigate = useNavigate()
  
    const handleSubmit = async () => {
      logout();
      // navigate("/login", {replace: true})
    };
    return(
        /**
        * Extract the currrentUser from the context, if you want to
        * get the User info, like the email, display name, etc.
        */
        <div className='user-profile'>
          <div className='top-bar'></div>
          <div className='list-files'></div>
          <div style={{marginLeft: "auto", marginRight: "auto"}} className='profile'>
          {/* <h3 className='name'>Welcome! {currentUser?.email}</h3> */}
          <h3 className='name'>Welcome! {user}</h3>
            <p className='status'>Sign In Status: {currentUser && 'active'}</p>
            <Button className='signoutbutton' onClick={handleSubmit}>Sign Out</Button>
          </div>
        </div>
      )

}

export default UserProfile