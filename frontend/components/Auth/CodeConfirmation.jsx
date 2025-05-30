import React from "react";

function CodeConfirmation() {
    return (
        <div className="flex h-screen">
            {/* Imagen de Fondo */}
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: "url('fashion.JPG')"
                }}
            />

            {/* Formulario de Confirmación */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-4 md:p-0">
                <div className="w-full sm:w-96 p-8 shadow-md rounded-md">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 text-center">LuxuryClothes</h2>
                    <h3 className="text-lg sm:text-xl mb-6 text-gray-600 text-center">Enter The Confirmation Code</h3>

                    <form>
                        <input
                            type="text"
                            placeholder="Confirmation Code"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                        />
                        <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition mb-4">
                            Recover Account
                        </button>
                    </form>

                    <p className="text-center text-sm">
                        Didn’t receive Confirmation Code?{" "}
                        <a href="/forget-password" className="text-blue-500 hover:underline">
                            Resend Now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CodeConfirmation;
