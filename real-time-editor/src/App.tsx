import { Fragment, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/auth-contextPSQL";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RequireAuth from "./components/require-auth";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.css";
import EditorPage from "./pages/EditorPage";
import { JSX } from "react/jsx-runtime";

function App() {
  const { isAuthenticated,setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthetnicated] = useState(false);
  // const setAuth = (boool: boolean) => {
  //   setIsAuthetnicated(boool);
  // };

  // // NOTE: console log for testing purposes
  // console.log("User:", !!currentUser);

  // // Check if the current user exists on the initial render.
  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/homepage");
  //   }
  // }, [currentUser]);

  return (
    // <Routes>
    //   <Route path="login" index element={<Login />} />
    //   <Route path="editor-page" element={<EditorPage/>}/>
    //   <Route
    //     path="homepage"
    //     element={
    //       <RequireAuth>
    //         <HomePage />
    //       </RequireAuth>
    //     }
    //   />
    //   <Route
    //     path="signup"
    //     element={
    //       <SignUp />
    //     }
    //   />
    // </Routes>

    <Fragment>
      {/* <Router> */}
        <div className="routes">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/homepage" replace />
                ) : (
                  <Login/>
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/homepage" replace />
                ) : (
                  <SignUp/>
                )
              }
            />
            <Route
              path="/homepage"
              element={
                isAuthenticated ? (
                  <HomePage/>
                ) : (
                  <Navigate to="/login" replace/>
                )
              }
            />
            {/* <Route
              path="/login"
              loader={(props) =>
                !isAuthenticated ? <Login /> : redirect("/homepage")
              }
            />
            <Route path="/editor-page" element={<EditorPage />} />
            <Route
              path="/homepage"
              loader={(props) =>
                !isAuthenticated ? <HomePage /> : redirect("/login")
              }
            />
            <Route
              path="/signup"
              loader={(props) =>
                !isAuthenticated ? <SignUp /> : redirect("/homepage")
              }
            /> */}
          </Routes>
        </div>
      {/* </Router> */}
    </Fragment>
  );
}

export default App;
