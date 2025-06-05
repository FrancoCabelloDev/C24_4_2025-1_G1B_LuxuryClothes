import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const newsItems = [
  {
    id: 1,
    title: "Nueva colección de temporada",
    description: "Estilo, lujo y tendencia en cada costura. Descubre nuestra línea primavera-verano 2025.",
    image: "/news/new-collection-1.jpg",
  },
  {
    id: 2,
    title: "Edición limitada de bolsos",
    description: "Modelos exclusivos con detalles artesanales. Solo por tiempo limitado.",
    image: "/news/new-collection-2.png",
  },
];

export default function News() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-12">Novedades</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {newsItems.map(({ id, title, description, image }) => (
            <div key={id} className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
              <img src={image} alt={title} className="w-full h-60 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700">{description}</p>
                <button className="mt-4 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
