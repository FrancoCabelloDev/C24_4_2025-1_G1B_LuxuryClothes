import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const bundles = [
  {
    title: "Combo Casual Deluxe",
    price: 999.99,
    items: ["Camisa Versace", "Pantalón Armani", "Zapatillas Gucci"],
    image: "/packages/combo-casual.jpg",
  },
  {
    title: "Pack Gala Premium",
    price: 1499.99,
    items: ["Saco Hugo Boss", "Zapatos LV", "Reloj Emporio Armani"],
    image: "/packages/combo-gala.jpg",
  },
];

export default function Packages() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-12">Paquetes Premium</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {bundles.map((bundle, idx) => (
            <div key={idx} className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
              <img src={bundle.image} alt={bundle.title} className="w-full h-60 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{bundle.title}</h2>
                <ul className="mb-4 list-disc list-inside text-gray-700">
                  {bundle.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-gray-900 mb-4">S/. {bundle.price.toFixed(2)}</p>
                <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
                  Comprar ahora
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
