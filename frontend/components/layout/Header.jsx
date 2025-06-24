import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
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

        {/* Sección derecha */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm font-medium">
                Hola, {user.nombre || user.email}
              </span>
              <Link
                to="/profile"
                className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
              >
                Editar usuario
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-800 transition"
              >
                Cerrar sesión
              </button>
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
                  Editar usuario
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-1 text-red-600 hover:text-red-800 transition-colors"
                >
                  Cerrar sesión
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