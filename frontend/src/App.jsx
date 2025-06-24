import React from "react";  
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // ✅ Importar el CartProvider

// Rutas de autenticación
import Login from "../components/Auth/Login.jsx";
import Register from "../components/Auth/Register.jsx";
import ForgetPassword from "../components/Auth/ForgetPassword.jsx";
import CodeConfirmation from "../components/Auth/CodeConfirmation.jsx";
import NewPassword from "../components/Auth/NewPassword.jsx";

// Páginas principales
import Home from "../components/pages/home.jsx";
import Shop from "../components/pages/Shop.jsx";
import News from "../components/pages/News.jsx";
import Packages from "../components/pages/Packages.jsx";
import Cart from "../components/pages/Cart.jsx";
import Checkout from "../components/pages/Checkout.jsx"; // ✅ AGREGAR ESTA LÍNEA

function App() {
    return (
        <CartProvider> {/* ✅ Envolver toda la app con CartProvider */}
            <Router>
                <Routes>
                    {/* Páginas del sitio */}
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Shop />} />
                    <Route path="/novedades" element={<News />} />
                    <Route path="/paquetes" element={<Packages />} />
                    <Route path="/carrito" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} /> {/* ✅ AGREGAR ESTA LÍNEA */}

                    {/* Autenticación */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgetpassword" element={<ForgetPassword />} />
                    <Route path="/codeconfirmation" element={<CodeConfirmation />} />
                    <Route path="/newpassword" element={<NewPassword />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;