import React from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const nombre = params.get("nombre");

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {nombre
                ? <h1 className="text-4xl font-bold">Bienvenido a Luxury Clothes {nombre}</h1>
                : <h1 className="text-4xl font-bold">Bienvenido a Luxury Clothes</h1>
            }
        </div>
    );
}

export default Home;
