import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowLeft, FaCreditCard, FaPlus, FaMinus } from "react-icons/fa";
import { CartContext } from "../../src/context/CartContext";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  // Calcular totales
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 200 ? 0 : 15; // Envío gratis por compras > S/200
  const total = subtotal + shipping;

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(index);
    } else if (updateQuantity) {
      updateQuantity(index, newQuantity);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-20 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Carrito de Compras</span>
          </nav>
        </div>

        {/* Header del carrito */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-2xl text-gray-800" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Tu Carrito
            </h1>
            {cart.length > 0 && (
              <span className="bg-black text-white text-sm px-3 py-1 rounded-full font-medium">
                {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
              </span>
            )}
          </div>
          
          <Link 
            to="/productos"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <FaArrowLeft size={16} />
            Seguir Comprando
          </Link>
        </div>

        {cart.length === 0 ? (
          /* Estado vacío mejorado */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mb-6">
              <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Parece que aún no has agregado ningún producto a tu carrito. 
                ¡Explora nuestra colección y encuentra algo que te encante!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/productos"
                className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium transform hover:scale-105"
              >
                Explorar Productos
              </Link>
              <Link 
                to="/"
                className="bg-white text-gray-700 px-8 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-300 font-medium transform hover:scale-105"
              >
                Ir al Inicio
              </Link>
            </div>
          </div>
        ) : (
          /* Carrito con productos */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Imagen del producto */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.gender && (
                          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                            {item.gender}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Talla: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>
                        
                        {/* Botón eliminar */}
                        <button
                          onClick={() => removeFromCart(index)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                          title="Eliminar producto"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>

                      {/* Cantidad y precio */}
                      <div className="flex items-center justify-between">
                        {/* Selector de cantidad */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <FaMinus size={12} className={(item.quantity || 1) <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium bg-gray-50 min-w-[3rem] text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FaPlus size={12} className="text-gray-600" />
                          </button>
                        </div>

                        {/* Precio */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            S/. {(item.price * (item.quantity || 1)).toFixed(2)}
                          </p>
                          {(item.quantity || 1) > 1 && (
                            <p className="text-sm text-gray-500">
                              S/. {item.price.toFixed(2)} c/u
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botón vaciar carrito */}
              <div className="pt-4">
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
                >
                  <FaTrash size={14} />
                  Vaciar carrito
                </button>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                {/* Detalles del costo */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</span>
                    <span>S/. {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'GRATIS' : `S/. ${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                      💡 Envío gratis en compras mayores a S/. 200
                    </p>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>S/. {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                  <Link 
                    to="/checkout"
                    className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    <FaCreditCard size={18} />
                    Proceder al Pago
                  </Link>
                  
                  <Link 
                    to="/productos"
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium text-center block"
                  >
                    Continuar Comprando
                  </Link>
                </div>

                {/* Políticas */}
                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Devoluciones gratuitas en 30 días</p>
                    <p>✓ Garantía de satisfacción</p>
                    <p>✓ Pago seguro y protegido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}