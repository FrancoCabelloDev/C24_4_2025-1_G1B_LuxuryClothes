import React, { useState, useContext } from "react";
import { CartContext } from "../../src/context/CartContext";

export default function NewArrivals() {
  const { addToCart } = useContext(CartContext);
  
  // Estado para filtro activo
  const [activeFilter, setActiveFilter] = useState("Moda Femenina");

  // Categorías de filtro
  const filterCategories = [
    "Moda Masculina",
    "Moda Femenina", 
    "Accesorios Mujer",
    "Accesorios Hombre",
    "Ofertas Especiales"
  ];

  // Productos simulados
  const allProducts = [
    // Moda Femenina
    {
      id: 101,
      name: "Vestido Brillante",
      brand: "Al Karam",
      price: 285.50,
      rating: 5,
      reviews: 18,
      status: "Casi Agotado",
      category: "Moda Femenina",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&crop=faces"
    },
    {
      id: 102,
      name: "Vestido Largo Elegante",
      brand: "Al Karam",
      price: 295.50,
      rating: 5,
      reviews: 24,
      status: "Casi Agotado",
      category: "Moda Femenina",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&crop=faces"
    },
    {
      id: 103,
      name: "Suéter Completo",
      brand: "Al Karam",
      price: 225.50,
      rating: 5,
      reviews: 32,
      status: "Casi Agotado",
      category: "Moda Femenina",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop&crop=faces"
    },
    {
      id: 104,
      name: "Vestido Blanco",
      brand: "Al Karam",
      price: 275.50,
      rating: 5,
      reviews: 15,
      status: "Casi Agotado",
      category: "Moda Femenina",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=faces"
    },
    {
      id: 105,
      name: "Vestido Colorido",
      brand: "Al Karam",
      price: 315.50,
      rating: 5,
      reviews: 28,
      status: "Casi Agotado",
      category: "Moda Femenina",
      image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&h=500&fit=crop&crop=faces"
    },
    {
      id: 106,
      name: "Camisa Blanca",
      brand: "Al Karam",
      price: 185.50,
      rating: 5,
      reviews: 19,
      status: "Casi Agotado",
      category: "Moda Femenina",
      image: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400&h=500&fit=crop&crop=faces"
    },

    // Moda Masculina
    {
      id: 201,
      name: "Traje Elegante Negro",
      brand: "Hugo Boss",
      price: 485.50,
      rating: 5,
      reviews: 22,
      status: "Nuevo",
      category: "Moda Masculina",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces"
    },
    {
      id: 202,
      name: "Camisa Casual Premium",
      brand: "Armani",
      price: 195.50,
      rating: 4,
      reviews: 16,
      status: "Casi Agotado",
      category: "Moda Masculina",
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop&crop=faces"
    },

    // Accesorios Mujer
    {
      id: 301,
      name: "Bolso de Lujo",
      brand: "Chanel",
      price: 895.50,
      rating: 5,
      reviews: 45,
      status: "Exclusivo",
      category: "Accesorios Mujer",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center"
    },
    {
      id: 302,
      name: "Collar Premium",
      brand: "Tiffany",
      price: 1295.50,
      rating: 5,
      reviews: 38,
      status: "Limitado",
      category: "Accesorios Mujer",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=500&fit=crop&crop=center"
    },

    // Accesorios Hombre
    {
      id: 401,
      name: "Reloj de Lujo",
      brand: "Rolex",
      price: 2495.50,
      rating: 5,
      reviews: 67,
      status: "Premium",
      category: "Accesorios Hombre",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop&crop=center"
    },

    // Ofertas Especiales
    {
      id: 501,
      name: "Conjunto Completo",
      brand: "Zara",
      price: 145.50,
      originalPrice: 245.50,
      rating: 4,
      reviews: 29,
      status: "40% DESC",
      category: "Ofertas Especiales",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop&crop=center"
    }
  ];

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = allProducts.filter(product => product.category === activeFilter);

  // Función para renderizar estrellas
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  // Función para agregar al carrito
  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand
    };
    addToCart(cartProduct);
  };

  // Función para obtener color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case "Casi Agotado": return "text-red-500";
      case "Nuevo": return "text-green-500";
      case "Exclusivo": return "text-purple-500";
      case "Limitado": return "text-blue-500";
      case "Premium": return "text-gold-500";
      default: return "text-orange-500";
    }
  };

  return (
    <section className="bg-white py-16 px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nuevos Productos
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Descubre las últimas tendencias en moda de lujo. Nuestra colección de nuevos productos 
            incluye las piezas más exclusivas de las marcas más prestigiosas del mundo.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Imagen del producto */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* Botón flotante de agregar al carrito */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 bg-black text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800"
                >
                  Agregar al Carrito
                </button>
              </div>

              {/* Información del producto */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600">
                    ({product.reviews}) Reseñas de Clientes
                  </span>
                  <span className={`text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      S/. {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        S/. {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-sm text-black hover:text-gray-700 transition-colors font-medium lg:hidden"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver Más */}
        <div className="text-center">
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg font-medium">
            Ver Más Productos
          </button>
        </div>

      </div>
    </section>
  );
}