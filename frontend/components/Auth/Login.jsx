import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            // Depuración: verifica que el token exista
            console.log("Google token:", token);

            const response = await axios.post("http://localhost:8084/api/auth/google", { token }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const user = response.data;
            localStorage.setItem("user", JSON.stringify(user));

            // Depuración: verifica que el usuario se guarda y navega
            console.log("Usuario autenticado:", user);
            navigate("/welcome");
        } catch (error) {
            console.error("Error al autenticar:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-cover" style={{ backgroundImage: "url('fashion.JPG')" }}></div>

            <div className="w-1/2 flex justify-center items-center bg-white">
                <div className="w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">LuxuryClothes</h2>
                    <h3 className="text-xl mb-6 text-gray-600">Sign In</h3>

                    <div className="flex gap-4 mb-4">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => console.log("Login Failed")}
                            width="100%"
                        />
                    </div>

                    <div className="text-center my-4 text-gray-400">— OR —</div>

                    <form>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                            Sign In
                        </button>
                    </form>

                    <div className="flex justify-between mt-4">
                        <a href="/register" className="text-blue-500 hover:underline">Register Now</a>
                        <a href="/forgetpassword" className="text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;