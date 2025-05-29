// frontend/src/components/pages/Home.jsx

import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-8">
          <h1 className="text-2xl font-extrabold tracking-wide">Luxury Clothes</h1>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {["Inicio","Ofertas","Novedades","Paquetes","Iniciar Sesión"].map((label) => (
              <a
                key={label}
                href="/"
                className="relative group pb-1"
              >
                {label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all"></span>
              </a>
            ))}
            <button className="bg-black text-white px-5 py-2 rounded-full shadow-lg hover:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-0.5 transition">
              Registrarse
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-20 gap-10 flex-1">
        {/* Imagen izquierda */}
        <div className="overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105">
          <img
            src="/model1.jpg"
            alt="Moda mujer"
            className="object-cover h-[450px] w-full"
          />
        </div>

        {/* Texto central */}
        <div className="text-center lg:w-1/3 space-y-6">
          <h2 className="text-6xl font-extrabold uppercase">Ultimate Sale</h2>
          <p className="text-lg text-gray-600">New Collection</p>
          <button className="bg-black text-white px-8 py-3 rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:-translate-y-1 transition">
            Shop Now
          </button>
        </div>

        {/* Imagen derecha */}
        <div className="overflow-hidden rounded-xl shadow-lg transform transition hover:scale-105">
          <img
            src="/model2.jpg"
            alt="Moda hombre"
            className="object-cover h-[450px] w-full"
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-12 px-8 lg:px-0">
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
      </footer>
    </div>
  );
}

export default Home;
