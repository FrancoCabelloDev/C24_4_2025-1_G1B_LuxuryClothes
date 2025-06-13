import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Ofertas", path: "/ofertas" },
    { label: "Novedades", path: "/novedades" },
    { label: "Paquetes", path: "/paquetes" },
    { label: "Iniciar Sesión", path: "/login" },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">
        <h1 className="text-2xl font-extrabold tracking-wide">Luxury Clothes</h1>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map(({ label, path }) => (
            <Link key={label} to={path} className="relative group pb-1">
              {label}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all" />
            </Link>
          ))}

          {/* Ícono del carrito */}
          <Link to="/carrito" className="relative group pb-1 hover:text-black">
            <FaShoppingCart size={20} />
          </Link>

          <Link
            to="/register"
            className="bg-black text-white px-5 py-2 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-0.5 transition"
          >
            Registrarse
          </Link>
        </nav>
      </div>
    </header>
  );
}
