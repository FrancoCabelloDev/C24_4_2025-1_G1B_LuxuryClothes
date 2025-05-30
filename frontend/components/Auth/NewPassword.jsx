import React from "react";

function NewPassword() {
    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('fashion.JPG')" }}
            ></div>

            {/* Formulario de Nueva Contraseña */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4 md:p-0">
                <div className="w-full sm:w-96 p-8 shadow-md rounded-md">
                    {/* Título */}
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">LuxuryClothes</h2>
                    <h3 className="text-lg sm:text-xl mb-6 text-gray-600 text-center">Enter Your New Password</h3>

                    {/* Campos de Nueva Contraseña */}
                    <form>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirmation Password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPassword;
