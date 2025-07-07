import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../src/context/CartContext";
import axios from "axios";

export default function NewArrivals() {
  const { addToCart } = useContext(CartContext);
  
  // Estados
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Todos");

  // Obtener productos desde la API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8084/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener categorías dinámicamente
  const allCategories = ["Todos", ...new Set(products.map(p => p.category?.name).filter(Boolean))];
  
  // Si no hay categorías desde la API, usar filtros por género
  const filterCategories = allCategories.length > 1 ? allCategories : [
    "Todos",
    "Masculino", 
    "Femenino",
    "Accesorios"
  ];

  // Filtrar productos según el filtro activo
  const filteredProducts = products.filter(product => {
    if (activeFilter === "Todos") return true;
    
    // Filtrar por categoría si existe
    if (product.category?.name === activeFilter) return true;
    
    // Filtrar por género si no hay categorías específicas
    if (activeFilter === "Masculino" && product.gender?.toLowerCase() === "hombre") return true;
    if (activeFilter === "Femenino" && product.gender?.toLowerCase() === "mujer") return true;
    if (activeFilter === "Accesorios" && product.category?.name?.toLowerCase().includes("accesorio")) return true;
    
    return false;
  });

  // Limitar a los primeros 6 productos para "nuevos arrivals"
  const displayedProducts = filteredProducts.slice(0, 6);

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image || '/placeholder-image.jpg',
      brand: product.brand?.name || 'Sin marca',
      quantity: 1
    };
    addToCart(cartItem);
  };

  // Función para generar URL de imagen
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8084/${imagePath}`;
  };

  // Renderizar estrellas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < fullStars ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Función para obtener color del estado
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'disponible':
        return 'text-green-600';
      case 'agotado':
        return 'text-red-600';
      case 'casi agotado':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nuevos Productos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-900 to-gray-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra última colección de productos de lujo, cuidadosamente seleccionados para ti
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-4">Cargando productos...</p>
          </div>
        )}

        {/* Grid de Productos */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No hay productos disponibles</p>
                <p className="text-gray-500 mt-2">Agrega productos desde el panel de administración</p>
              </div>
            ) : (
              displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                  {/* Imagen del producto */}
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    
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
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      {product.brand?.name || 'Luxury Brand'}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-600">
                        {product.category?.name || 'Categoría general'}
                      </span>
                      <span className={`text-xs font-medium ${getStatusColor('Disponible')}`}>
                        Disponible
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          S/. {(product.price || 0).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Colores disponibles */}
                        {product.color && (
                          <div className="flex gap-1">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: product.color.toLowerCase() }}
                              title={product.color}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Botón Ver Más */}
        {!loading && displayedProducts.length > 0 && (
          <div className="text-center">
            <a
              href="/productos"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Ver Todos los Productos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}