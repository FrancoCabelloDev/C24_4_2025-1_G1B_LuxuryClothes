import React from "react";

export default function Hero() {
  return (
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
  );
}
