import React, { useContext } from "react";
import { CartContext } from "../../src/context/CartContext";
import Header from "../layout/Header"; // Ajusta si tu Header está en otra carpeta
import Footer from "../layout/Footer";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">Tu Carrito</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-700">S/. {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="text-right mt-8 text-xl font-bold">
              Total: S/. {total.toFixed(2)}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={clearCart}
                className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-black"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
