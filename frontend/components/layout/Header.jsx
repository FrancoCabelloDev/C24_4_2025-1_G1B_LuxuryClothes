import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [user, setUser] = React.useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  // Enlaces de navegación
  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/productos" },
    { label: "Novedades", path: "/novedades" },
    { label: "Paquetes", path: "/paquetes" },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <h1 className="text-3xl font-extrabold tracking-wide text-gray-900 hover:text-gray-700 transition-colors cursor-pointer">
              Luxury Clothes
            </h1>
          </Link>
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

        {/* Sección derecha */}
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              {/* Botón del usuario */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 group border border-gray-200 hover:border-gray-300"
              >
                {/* Avatar */}
                <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-xs" />
                </div>
                
                {/* Nombre del usuario */}
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-gray-900">
                    {user.nombre || 'Usuario'}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[150px]">
                    {user.email}
                  </div>
                </div>
                
                {/* Icono de dropdown */}
                <FaChevronDown 
                  className={`text-gray-500 text-xs transition-transform duration-200 ${
                    showDropdown ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  {/* Overlay para cerrar dropdown */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowDropdown(false)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20 animate-in slide-in-from-top-2 duration-200">
                    {/* Usuario info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                          <FaUser className="text-white text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">
                            {user.nombre || 'Usuario'}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      >
                        <FaUser className="mr-3 text-gray-400 group-hover:text-gray-600" />
                        <span>Editar Perfil</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                      >
                        <FaSignOutAlt className="mr-3 text-red-400 group-hover:text-red-600" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
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
          )}
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
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="py-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Editar Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-1 text-red-600 hover:text-red-800 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="relative group py-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Iniciar Sesión
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gray-900 group-hover:w-full transition-all duration-300" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}