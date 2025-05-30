import React from "react";

function Register() {
    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: "url('fashion.JPG')"
                }}
            ></div>

            {/* Formulario de Registro */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4 md:p-0">
                <div className="w-full sm:w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">LuxuryClothes</h2>
                    <h3 className="text-lg sm:text-xl mb-6 text-gray-600 text-center">Create Account</h3>

                    {/* Botones de Redes Sociales */}
                    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:gap-4">
                        <button className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                            <img
                                src="https://img.icons8.com/color/24/google-logo.png"
                                alt="Google"
                                className="mr-2"
                            />
                            Sign up with Google
                        </button>
                        <button className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                            <img
                                src="https://img.icons8.com/color/24/gmail.png"
                                alt="Email"
                                className="mr-2"
                            />
                            Sign up with Email
                        </button>
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
