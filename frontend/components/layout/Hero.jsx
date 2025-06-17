import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaArrowUp } from "react-icons/fa";
import { CartContext } from "../../src/context/CartContext";

export default function Hero() {
  const { cart } = useContext(CartContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section - Imágenes rectangulares sin bordes */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 gap-10 flex-1">
        <div className="transform transition hover:scale-105">
          <img
            src="/model1.jpg"
            alt="Moda mujer elegante"
            className="object-cover h-[500px] w-[320px] lg:w-[380px]"
          />
        </div>

        <div className="text-center lg:w-1/3 space-y-6 relative">
          {/* Imagen superior - Estilo banner/portada como en Figma */}
          <div className="w-72 h-20 lg:w-80 lg:h-24 mx-auto mb-8">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=200&fit=crop&crop=faces"
              alt="Banner de moda luxury"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texto principal - Estilo Figma */}
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tight text-gray-900 leading-none">
              ULTIMATE
            </h2>
            <h2 className="text-6xl lg:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 leading-none" style={{
              WebkitTextStroke: '2px #e5e7eb',
              textStroke: '2px #e5e7eb'
            }}>
              SALE
            </h2>
          </div>

          <p className="text-lg lg:text-xl font-semibold text-gray-600 tracking-widest uppercase mt-6">
            New Collection
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-1 transition mt-6">
            Shop Now
          </button>

          {/* Imagen inferior - Estilo banner/portada como en Figma */}
          <div className="w-72 h-20 lg:w-80 lg:h-24 mx-auto mt-8">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=200&fit=crop&crop=faces"
              alt="Banner colección premium"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="transform transition hover:scale-105">
          <img
            src="/model2.jpg"
            alt="Moda hombre elegante"
            className="object-cover h-[500px] w-[320px] lg:w-[380px]"
          />
        </div>

        {/* Elementos flotantes - Carrito funcional */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
          {/* Carrito flotante con funcionalidad completa */}
          <Link 
            to="/carrito"
            className="relative bg-black text-white p-4 rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group"
          >
            <FaShoppingCart size={20} className="transform group-hover:rotate-12 transition-transform duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-md animate-bounce">
                {cart.length > 99 ? '99+' : cart.length}
              </span>
            )}
          </Link>
          
          {/* Botón back to top */}
          <button 
            onClick={scrollToTop}
            className="bg-white text-black p-4 rounded-full shadow-xl hover:bg-gray-100 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200 group"
          >
            <FaArrowUp size={20} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </main>

    </>
  );
}