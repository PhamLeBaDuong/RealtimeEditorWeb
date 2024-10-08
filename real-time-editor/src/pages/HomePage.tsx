
import { useContext } from 'react'
// import { AuthContext } from '../context/auth-context'
import ListFileItem from '../components/listFileItem'
import { Navigate, useNavigate, useNavigation } from 'react-router-dom'
import UserProfile from '../components/userProfile';

type SetAuthType = (boool: boolean) => void;

interface HomepageProps {
  setAuth: SetAuthType;
}
function HomePage() {
  // const { currentUser, signOut } = useContext(AuthContext);
  // const navigate = useNavigate()

  // const handleSubmit = async () => {
  //   signOut
  //   navigate("/login", {replace: true})
  // };
  
  return(
    /**
    * Extract the currrentUser from the context, if you want to
    * get the User info, like the email, display name, etc.
    */
    <>
      {/* <div className='top-bar'></div>
      <div className='list-files'></div>
      <div>
        <h3>Welcome! {currentUser?.email}</h3>
        <p>Sign In Status: {currentUser && 'active'}</p>
        <button onClick={handleSubmit}>Sign Out</button>
      </div> */}
      <UserProfile/>
      {/* <ListFileItem/> */}
      </>
  )
}
export default HomePage
