import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
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
            // Redirige directamente al home
            navigate("/");
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

                    <div className="flex justify-center mb-4">
                        <div style={{ minWidth: 260, maxWidth: 340, width: "100%", display: "flex", justifyContent: "center" }}>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => console.log("Login Failed")}
                                width="340"
                                size="large"
                                theme="outline"
                                text="signin_with"
                                shape="rectangular"
                            />
                        </div>
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