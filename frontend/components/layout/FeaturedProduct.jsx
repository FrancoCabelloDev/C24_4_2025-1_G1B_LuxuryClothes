import React, { useState, useContext } from "react";
import { FaAward, FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";
import { CartContext } from "../../src/context/CartContext";

export default function FeaturedProduct() {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("M");

  // Producto destacado
  const featuredProduct = {
    id: 999,
    name: "Elegance Premium",
    collection: "Colección Femenina",
    description: "Vestido elegante de alta costura diseñado para la mujer moderna. Confeccionado con tejidos premium importados de Europa, este diseño único combina sofisticación y comodidad. Perfecto para ocasiones especiales, reuniones ejecutivas o eventos de gala. Su corte contemporáneo realza la silueta femenina mientras proporciona libertad de movimiento.",
    price: 450.00,
    sizes: ["S", "M", "L", "XL"],
    brands: ["Chanel", "Versace", "Dior", "Prada"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=700&fit=crop&crop=faces"
  };

  // Beneficios de la tienda
  const benefits = [
    {
      icon: FaAward,
      title: "Alta Calidad",
      subtitle: "Elaborado con materiales premium"
    },
    {
      icon: FaShieldAlt, 
      title: "Protección de Garantía",
      subtitle: "Más de 2 años"
    },
    {
      icon: FaTruck,
      title: "Envío Gratuito", 
      subtitle: "Pedidos mayores a S/. 150"
    },
    {
      icon: FaHeadset,
      title: "Soporte 24/7",
      subtitle: "Atención especializada"
    }
  ];

  const handleAddToCart = () => {
    const cartProduct = {
      id: featuredProduct.id,
      name: featuredProduct.name,
      price: featuredProduct.price,
      image: featuredProduct.image,
      size: selectedSize,
      brand: "LuxuryClothes"
    };
    addToCart(cartProduct);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-20">
        
        {/* Producto Destacado */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Imagen del Producto con Marcas */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-2xl overflow-hidden border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent"></div>
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                className="relative w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-700"
              />
              
              {/* Etiquetas de marcas flotantes mejoradas */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl text-sm font-semibold text-gray-800 border border-gray-200">
                {featuredProduct.brands[0]}
              </div>
              <div className="absolute top-20 right-6 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl text-sm font-semibold text-white">
                {featuredProduct.brands[1]}
              </div>
              <div className="absolute bottom-20 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl text-sm font-semibold text-gray-800 border border-gray-200">
                {featuredProduct.brands[2]}
              </div>
              <div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl text-sm font-semibold text-white">
                {featuredProduct.brands[3]}
              </div>
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-3 font-medium">
                {featuredProduct.collection}
              </p>
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {featuredProduct.name}
              </h2>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                DESCRIPCIÓN
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {featuredProduct.description}
              </p>
            </div>

            {/* Selector de Tallas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Talla:
              </h3>
              <div className="flex gap-3">
                {featuredProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div className="text-3xl font-bold text-gray-900">
              S/. {featuredProduct.price.toFixed(2)}
            </div>

            {/* Botón de Compra */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Comprar Ahora
            </button>
          </div>
        </div>

        {/* Sección de Beneficios */}
        <div className="border-t border-gray-200 pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por Qué Elegir LuxuryClothes?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprometidos con la excelencia en cada detalle de tu experiencia de compra
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 rounded-2xl group-hover:bg-black group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="text-black text-2xl group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}