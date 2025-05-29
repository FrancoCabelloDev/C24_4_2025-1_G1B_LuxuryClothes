// frontend/src/components/pages/Home.jsx

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">
          <h1 className="text-2xl font-extrabold tracking-wide">Luxury Clothes</h1>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {["Inicio", "Ofertas", "Novedades", "Paquetes", "Iniciar Sesión"].map(
              (label) => (
                <a key={label} href="/" className="relative group pb-1">
                  {label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all" />
                </a>
              )
            )}
            <button className="bg-black text-white px-5 py-2 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-0.5 transition">
              Registrarse
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 gap-10 flex-1">
        <div className="overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105">
          <img
            src="/model1.jpg"
            alt="Moda mujer"
            className="object-cover h-[450px] w-full"
          />
        </div>

        <div className="text-center lg:w-1/3 space-y-6">
          <h2 className="text-6xl font-extrabold uppercase">Ultimate Sale</h2>
          <p className="text-lg text-gray-600">New Collection</p>
          <button className="bg-black text-white px-8 py-3 rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-1 transition">
            Shop Now
          </button>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105">
          <img
            src="/model2.jpg"
            alt="Moda hombre"
            className="object-cover h-[450px] w-full"
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-50">
        {/* Logos de Marcas */}
        <div className="border-t">
          <div className="max-w-7xl mx-auto py-10 px-8">
            <div className="flex justify-center flex-wrap gap-12">
              {[
                { src: "/chanel.png", alt: "Chanel" },
                { src: "/lv.png", alt: "Louis Vuitton" },
                { src: "/prada.png", alt: "Prada" },
                { src: "/calvinklein.png", alt: "Calvin Klein" },
                { src: "/denim.png", alt: "Denim" },
              ].map(({ src, alt }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className="h-14 opacity-80 hover:opacity-100 transition"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Información y Contacto sobre fondo negro */}
        <div className="bg-black text-white">
          <div className="max-w-4xl mx-auto py-12 px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Empresa */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Empresa</h3>
                <p>Luxury Clothes S.A.</p>
                <p>Av. Principal 123, Lima, Perú</p>
                <p>RUC: 123456789</p>
              </div>

              {/* Contacto */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Contacto</h3>
                <p>
                  Email:&nbsp;
                  <a
                    href="mailto:info@luxuryclothes.com"
                    className="hover:underline"
                  >
                    info@luxuryclothes.com
                  </a>
                </p>
                <p>
                  Teléfono:&nbsp;
                  <a
                    href="tel:+51987654321"
                    className="hover:underline"
                  >
                    +51 987 654 321
                  </a>
                </p>
                <p>Horario: Lun–Vie 9:00–18:00</p>
              </div>

              {/* Redes Sociales */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="hover:text-blue-500 transition"
                  >
                    <FaFacebookF size={20} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-pink-500 transition"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="hover:text-blue-700 transition"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
