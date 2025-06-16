import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../src/context/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  
  // Enlaces de navegación
  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Ofertas", path: "/ofertas" },
    { label: "Novedades", path: "/novedades" },
    { label: "Paquetes", path: "/paquetes" },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 hover:text-gray-700 transition-colors cursor-pointer">
            Luxury Clothes
          </h1>
        </div>
        
        {/* Navegación principal - Centro */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map(({ label, path }) => (
            <Link 
              key={label} 
              to={path} 
              className="relative group py-2 px-1 text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors duration-200"
            >
              {label}
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-300 ease-out" />
            </Link>
          ))}
        </nav>

        {/* Sección derecha - Mejor espaciado */}
        <div className="flex items-center">
          {/* Grupo: Iniciar Sesión + Registrarse */}
          <div className="hidden md:flex items-center space-x-4 mr-8">
            <Link 
              to="/login" 
              className="relative group py-2 px-3 text-gray-700 hover:text-gray-900 font-medium text-sm tracking-wide transition-colors duration-200"
            >
              Iniciar Sesión
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:w-full transition-all duration-300 ease-out" />
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out text-sm font-semibold tracking-wide hover:from-gray-800 hover:to-gray-700"
            >
              Registrarse
            </Link>
          </div>

          {/* Carrito separado - Al extremo derecho */}
          <div className="relative">
            <Link 
              to="/carrito" 
              className="relative p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200 group"
            >
              <FaShoppingCart size={22} className="transform group-hover:scale-110 transition-transform duration-200" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-md animate-pulse">
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación móvil */}
      <div className="lg:hidden border-t border-gray-100 bg-gray-50">
        <div className="px-8 py-4">
          <nav className="flex flex-wrap gap-6 text-sm font-medium">
            {navItems.map(({ label, path }) => (
              <Link 
                key={label} 
                to={path} 
                className="relative group py-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gray-900 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link 
              to="/login" 
              className="relative group py-1 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Iniciar Sesión
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gray-900 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}