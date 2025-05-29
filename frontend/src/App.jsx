import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login.jsx";
import Home from "../components/pages/home.jsx";
import Register from "../components/Auth/Register.jsx";
import ForgetPassword from "../components/Auth/ForgetPassword.jsx";
import CodeConfirmation from "../components/Auth/CodeConfirmation.jsx";
import NewPassword from "../components/Auth/NewPassword.jsx";

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
        </Routes>
    );
}

export default App;