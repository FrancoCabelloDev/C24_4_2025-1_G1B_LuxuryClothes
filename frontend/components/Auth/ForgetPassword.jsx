// src/components/Auth/ForgetPassword.jsx
import React from "react";

function ForgetPassword() {
    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div
                className="w-1/2 bg-cover"
                style={{
                    backgroundImage: "url('fashion.JPG')"  // igual que en Login/Register
                }}
            ></div>

            {/* Formulario de Recuperación */}
            <div className="w-1/2 flex justify-center items-center bg-white">
                <div className="w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">LuxuryClothes</h2>
                    <h3 className="text-xl mb-6 text-gray-600">Forget Password</h3>

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
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />

                        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition mb-4">
                            Send Confirmation Code
                        </button>
                    </form>

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

export default ForgetPassword;
