import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsersThunk, getUserProfileThunk } from "./store/slice/user/User.thunk";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
      await dispatch(getOtherUsersThunk());
    })();
  }, [dispatch]);
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/chat" element={<h1>Chat</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
