import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoutes from "./components/UserRoutes";
import AuthRoutes from "./components/AuthRoutes";
import SetAvatar from "./pages/SetAvatar";

import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/setavatar" element={<SetAvatar />} />
        </Route>
        <Route element={<UserRoutes />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default App;
