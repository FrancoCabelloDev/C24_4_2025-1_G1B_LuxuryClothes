import React from "react";

function Login() {
    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{
                backgroundImage: "url('fashion.JPG')"
            }}></div>

            {/* Formulario de Inicio de Sesión */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4 md:p-0">
                <div className="w-full sm:w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">LuxuryClothes</h2>
                    <h3 className="text-lg sm:text-xl mb-6 text-gray-600 text-center">Sign In</h3>

                    {/* Botones de Redes Sociales */}
                    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:gap-4">
                        <button className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                            <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" className="mr-2" />
                            Sign up with Google
                        </button>
                        <button className="flex items-center justify-center w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                            <img src="https://img.icons8.com/color/24/gmail.png" alt="Email" className="mr-2" />
                            Sign up with Email
                        </button>
                    </div>

                    {/* Línea Divisoria */}
                    <div className="text-center my-4 text-gray-400">— OR —</div>

                    {/* Formulario */}
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

                    {/* Links de Registro y Recuperación */}
                    <div className="flex flex-col sm:flex-row justify-between mt-4 text-center sm:text-left">
                        <a href="/register" className="text-blue-500 hover:underline mb-2 sm:mb-0">Register Now</a>
                        <a href="/forgetpassword" className="text-blue-500 hover:underline">Forgot Password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
