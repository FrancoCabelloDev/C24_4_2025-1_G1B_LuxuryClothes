// src/components/Auth/Register.jsx
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const response = await axios.post("http://localhost:8084/api/auth/google", { token }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const user = response.data;
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/welcome");
        } catch (error) {
            console.error("Error al registrar con Google:", error);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div
                className="w-1/2 bg-cover"
                style={{
                    backgroundImage: "url('fashion.JPG')"
                }}
            ></div>

            {/* Formulario de Registro */}
            <div className="w-1/2 flex justify-center items-center bg-white">
                <div className="w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">LuxuryClothes</h2>

                    {/* Botón de Google */}
                    <div className="flex justify-center mb-4">
                        <div style={{ minWidth: 260, maxWidth: 340, width: "100%", display: "flex", justifyContent: "center" }}>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => console.log("Google Register Failed")}
                                width="340"
                                size="large"
                                theme="outline"
                                text="continue_with" // Cambia el texto del botón
                                shape="rectangular"
                                locale="es" // Opcional: fuerza el idioma a español
                            />
                        </div>
                    </div>

                    {/* Línea Divisoria */}
                    <div className="text-center my-4 text-gray-400">— OR —</div>

                    {/* Campos del Formulario */}
                    <form>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition mb-4">
                            Create Account
                        </button>
                    </form>

                    {/* Link a Login */}
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
