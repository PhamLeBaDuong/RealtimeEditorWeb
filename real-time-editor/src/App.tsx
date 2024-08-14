import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RequireAuth from "./components/require-auth";
import SignUp from "./pages/SignUp";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // NOTE: console log for testing purposes
  console.log("User:", !!currentUser);

  // Check if the current user exists on the initial render.
  useEffect(() => {
    if (currentUser) {
      navigate("/homepage");
    }
  }, [currentUser]);

  return (
    <Routes>
      <Route path="login" index element={<Login />} />
      <Route
        path="homepage"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="signup"
        element={
          <SignUp />
        }
      />
    </Routes>
  );
}

export default App;
