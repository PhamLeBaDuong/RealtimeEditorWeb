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
  // const { isAuthenticated,setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <EditorPage/>
        {/* <div className="routes">
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
          </Routes>
        </div> */}
    </Fragment>
  );
}

export default App;
