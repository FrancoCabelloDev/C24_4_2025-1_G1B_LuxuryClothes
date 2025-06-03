import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login.jsx";
import Home from "../components/pages/home.jsx";
import Register from "../components/Auth/Register.jsx";
import ForgetPassword from "../components/Auth/ForgetPassword.jsx";
import CodeConfirmation from "../components/Auth/CodeConfirmation.jsx";
import NewPassword from "../components/Auth/NewPassword.jsx";
import Profile from "../components/pages/Profile.jsx"; // Asegúrate de que la ruta sea correcta

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/codeconfirmation" element={<CodeConfirmation />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default App;