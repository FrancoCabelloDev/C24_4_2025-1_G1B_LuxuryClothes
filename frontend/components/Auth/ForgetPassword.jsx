import React from "react";

function ForgetPassword() {
    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: "url('fashion.JPG')",
                }}
            ></div>

            {/* Formulario de Recuperación */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4 md:p-0">
                <div className="w-full sm:w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">LuxuryClothes</h2>
                    <h3 className="text-lg sm:text-xl mb-6 text-gray-600 text-center">Forget Password</h3>

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
