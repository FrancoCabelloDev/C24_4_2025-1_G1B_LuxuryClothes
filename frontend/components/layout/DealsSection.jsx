import React, { useState, useEffect, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CartContext } from "../../src/context/CartContext";

export default function DealsSection() {
  const { addToCart } = useContext(CartContext);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 6,
    minutes: 5,
    seconds: 30
  });

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Products data
  const dealProducts = [
    {
      id: 1,
      name: "Vestido Negro Elegante",
      originalPrice: 299.99,
      salePrice: 209.99,
      discount: "30% DESC",
      category: "Oferta de Primavera",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "Conjunto Denim Chic",
      originalPrice: 199.99,
      salePrice: 139.99,
      discount: "30% DESC",
      category: "Colección Verano",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces"
    },
    {
      id: 3,
      name: "Look Casual Premium",
      originalPrice: 179.99,
      salePrice: 125.99,
      discount: "30% DESC",
      category: "Ropa Casual",
      image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=400&h=600&fit=crop&crop=faces"
    }
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dealProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dealProducts.length) % dealProducts.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 4000);
    return () => clearInterval(autoSlide);
  }, []);

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      brand: "LuxuryClothes"
    };
    addToCart(cartProduct);
  };

  return (
    <section className="bg-gray-50 py-16 px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ofertas Del Mes
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Descubre nuestra exclusiva selección de prendas de lujo con descuentos increíbles. 
                Aprovecha estas ofertas limitadas en las marcas más prestigiosas del mundo de la moda.
              </p>
              
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                Comprar Ahora
              </button>
            </div>

            {/* Countdown Timer */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                ¡Apúrate, Antes De Que Sea Muy Tarde!
              </h3>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl font-bold text-gray-900">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm mt-2">Días</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl font-bold text-gray-900">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm mt-2">Hrs</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl font-bold text-gray-900">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm mt-2">Mins</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl font-bold text-gray-900">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm mt-2">Seg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Carousel */}
          <div className="relative">
            {/* Main Product Display */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {dealProducts.map((product, index) => (
                  <div key={product.id} className="w-full flex-shrink-0 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-96 lg:h-[500px] object-cover"
                    />
                    
                    {/* Product Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                      <div className="text-sm text-gray-300 mb-2">
                        {product.category}
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {product.discount}
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl font-bold">
                          S/. {product.salePrice}
                        </span>
                        <span className="text-gray-400 line-through">
                          S/. {product.originalPrice}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors font-semibold"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FaChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FaChevronRight size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {dealProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gray-900 scale-125' 
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}