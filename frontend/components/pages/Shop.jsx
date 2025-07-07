import React, { useState, useContext, useEffect } from "react";
import { FaThLarge, FaList, FaChevronDown, FaChevronUp, FaShoppingCart, FaArrowUp, FaPlus, FaMinus, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { CartContext } from "../../src/context/CartContext";
import axios from "axios";

export default function Shop() {
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();
  
  // Estados
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener productos desde la API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8084/api/products');
      console.log('Productos obtenidos:', response.data);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError('Error al cargar productos. Verifica que Spring Boot esté ejecutándose en puerto 8084.');
    } finally {
      setLoading(false);
    }
  };

  // Obtener categorías y marcas únicas
  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];
  const brands = [...new Set(products.map(p => p.brand?.name).filter(Boolean))];

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === "all" || product.category?.name === filterCategory;
    const matchesBrand = filterBrand === "all" || product.brand?.name === filterBrand;
    
    let matchesPrice = true;
    if (filterPrice !== "all") {
      const price = product.price || 0;
      switch (filterPrice) {
        case "under-100":
          matchesPrice = price < 100;
          break;
        case "100-500":
          matchesPrice = price >= 100 && price <= 500;
          break;
        case "500-1000":
          matchesPrice = price >= 500 && price <= 1000;
          break;
        case "over-1000":
          matchesPrice = price > 1000;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    return matchesCategory && matchesBrand && matchesPrice;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Manejar agregar al carrito
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
    // Si es una ruta relativa, construir URL completa (media Django)
    return `http://localhost:8084/media/${imagePath.replace(/^media\//, '').replace(/^products\//, 'products/')}`;
  };

  // Renderizar estrellas de rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300">☆</span>);
    }
    return stars;
  };

  // Botón back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-gray-600 mb-4 mx-auto" />
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Reintentar
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Botones flotantes: carrito y back to top */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* Carrito flotante */}
        <button
          onClick={() => navigate("/carrito")}
          className="relative bg-black text-white p-4 rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group"
        >
          <FaShoppingCart size={20} className="transform group-hover:rotate-12 transition-transform duration-300" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-md animate-bounce">
              {cart.length > 99 ? '99+' : cart.length}
            </span>
          )}
        </button>
        {/* Botón back to top */}
        <button
          onClick={scrollToTop}
          className="bg-white text-black p-4 rounded-full shadow-xl hover:bg-gray-100 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200 group"
        >
          <FaArrowUp size={20} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Nuestra Colección</h1>
            <p className="text-xl text-gray-300">
              Descubre productos de lujo 
            </p>
          </div>
        </section>

        {/* Controles y Filtros */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Vista y ordenamiento */}
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-l-lg ${viewMode === "grid" ? "bg-black text-white" : "text-gray-600"}`}
                  >
                    <FaThLarge />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-r-lg ${viewMode === "list" ? "bg-black text-white" : "text-gray-600"}`}
                  >
                    <FaList />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>
              </div>

              {/* Filtros */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Filtros {showFilters ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {/* Panel de filtros */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Categoría</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="all">Todas las categorías</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Marca</label>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="all">Todas las marcas</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Precio</label>
                    <select
                      value={filterPrice}
                      onChange={(e) => setFilterPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="all">Todos los precios</option>
                      <option value="under-100">Menos de S/. 100</option>
                      <option value="100-500">S/. 100 - S/. 500</option>
                      <option value="500-1000">S/. 500 - S/. 1,000</option>
                      <option value="over-1000">Más de S/. 1,000</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Grid de Productos */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No se encontraron productos</p>
                <p className="text-gray-500 mt-2">Prueba ajustando los filtros</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    {/* Imagen */}
                    <div className={`relative overflow-hidden ${
                      viewMode === "list" ? "w-48 h-48" : "w-full h-64"
                    }`}>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      {/* Elimina o comenta este overlay para probar */}
                      {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" /> */}
                    </div>

                    {/* Información del producto */}
                    <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {product.brand?.name || 'Sin marca'}
                      </p>

                      {product.category && (
                        <p className="text-xs text-gray-500 mb-2">
                          {product.category.name}
                        </p>
                      )}

                      <div className="flex items-center mb-3">
                        {renderStars(product.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          ({product.rating || 0})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-gray-900">
                            S/. {(product.price || 0).toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                          <FaShoppingCart size={14} />
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                <span className="text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}