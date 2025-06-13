import React from "react";  
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Rutas de autenticación
import Login from "../components/Auth/Login.jsx";
import Register from "../components/Auth/Register.jsx";
import ForgetPassword from "../components/Auth/ForgetPassword.jsx";
import CodeConfirmation from "../components/Auth/CodeConfirmation.jsx";
import NewPassword from "../components/Auth/NewPassword.jsx";

// Páginas principales
import Home from "../components/pages/home.jsx";
import Offers from "../components/pages/Offers.jsx";
import News from "../components/pages/News.jsx";
import Packages from "../components/pages/Packages.jsx";
import Cart from "../components/pages/Cart.jsx"; // ✅ Agregado

function App() {
    return (
        <Router>
            <Routes>
                {/* Páginas del sitio */}
                <Route path="/" element={<Home />} />
                <Route path="/ofertas" element={<Offers />} />
                <Route path="/novedades" element={<News />} />
                <Route path="/paquetes" element={<Packages />} />
                <Route path="/carrito" element={<Cart />} /> {/* ✅ Ruta del carrito */}

                {/* Autenticación */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgetpassword" element={<ForgetPassword />} />
                <Route path="/codeconfirmation" element={<CodeConfirmation />} />
                <Route path="/newpassword" element={<NewPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
