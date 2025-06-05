import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const products = [
  {
    id: 1,
    name: "Chaqueta Gucci Oversized",
    price: 1499.99,
    image: "/products/gucci-jacket.jpg",
  },
  {
    id: 2,
    name: "Zapatillas Louis Vuitton Runner",
    price: 1299.99,
    image: "/products/lv-shoes.jpg",
  },
  {
    id: 3,
    name: "Bolso Chanel Vintage",
    price: 1799.99,
    image: "/products/chanel-bag.jpg",
  },
  {
    id: 4,
    name: "Camisa Prada Silk",
    price: 899.99,
    image: "/products/prada-shirt.jpg",
  },
];

export default function Offers() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-12">Ofertas Exclusivas</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-lg text-gray-800 font-bold mt-2">${product.price}</p>
                <button className="mt-4 w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition">
                  Agregar al carrito
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
