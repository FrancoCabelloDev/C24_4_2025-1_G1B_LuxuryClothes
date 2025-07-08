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

  // Estado para cantidades por producto
  const [quantities, setQuantities] = useState({});

  // Cambiar cantidad
  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

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
  const handleAddToCart = (product, quantity) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image || '/placeholder-image.jpg',
      brand: product.brand?.name || 'Sin marca',
      quantity: quantity || 1,
      size: product.size,
      color: product.color,
      gender: product.gender
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
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-black">Inicio</Link>
            <span className="text-gray-400">/</span>
            <span className="text-black font-semibold">Productos</span>
          </nav>
        </div>

        {/* Filtros y Productos en Grid */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
            {/* Filtros a la izquierda */}
            <aside className="w-full lg:w-64 mb-8 lg:mb-0">
              <div className="bg-white rounded-xl shadow p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">Filtros</h2>
                {/* Género */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2">Género</h3>
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={filterCategory === "all"}
                        onChange={() => setFilterCategory("all")}
                        className="mr-2"
                      />
                      Todos
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={filterCategory === "Hombre"}
                        onChange={() => setFilterCategory("Hombre")}
                        className="mr-2"
                      />
                      Hombre
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={filterCategory === "Mujer"}
                        onChange={() => setFilterCategory("Mujer")}
                        className="mr-2"
                      />
                      Mujer
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={filterCategory === "Unisex"}
                        onChange={() => setFilterCategory("Unisex")}
                        className="mr-2"
                      />
                      Unisex
                    </label>
                  </div>
                </div>
                {/* Categoría */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2">Categoria</h3>
                  <div className="flex flex-col gap-2">
                    <label>
                      <input
                        type="radio"
                        name="category"
                        checked={filterCategory === "all"}
                        onChange={() => setFilterCategory("all")}
                        className="mr-2"
                      />
                      Todos
                    </label>
                    {categories.map(category => (
                      <label key={category}>
                        <input
                          type="radio"
                          name="category"
                          checked={filterCategory === category}
                          onChange={() => setFilterCategory(category)}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Marca */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2">Marca</h3>
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
                {/* Precio */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2">Precio</h3>
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
                {/* Limpiar filtros */}
                <button
                  onClick={() => {
                    setFilterCategory("all");
                    setFilterBrand("all");
                    setFilterPrice("all");
                  }}
                  className="text-blue-600 text-sm underline"
                >
                  Limpiar todo
                </button>
              </div>
            </aside>

            {/* Productos a la derecha */}
            <div className="flex-1">
              {/* Título y Controles en la misma línea */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Productos</h2>
                <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-lg h-10">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 h-full rounded-l-lg flex items-center justify-center ${viewMode === "grid" ? "bg-black text-white" : "text-gray-600"}`}
                  >
                    <FaThLarge />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 h-full rounded-r-lg flex items-center justify-center ${viewMode === "list" ? "bg-black text-white" : "text-gray-600"}`}
                  >
                    <FaList />
                  </button>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg h-10"
                  style={{ minWidth: 180 }}
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>
                </div>
              </div>
              {/* Grid de productos */}
              {paginatedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">No se encontraron productos</p>
                  <p className="text-gray-500 mt-2">Prueba ajustando los filtros</p>
                </div>
              ) : (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
                  {paginatedProducts.map((product) => {
                    const quantity = quantities[product.id] || 1;
                    const genderLabel = product.gender?.toLowerCase() === "hombre"
                      ? "Hombre"
                      : product.gender?.toLowerCase() === "mujer"
                        ? "Mujer"
                        : product.gender?.toLowerCase() === "unisex"
                          ? "Unisex"
                          : null;
                    const genderColor = genderLabel === "Hombre"
                      ? "bg-black"
                      : genderLabel === "Mujer"
                        ? "bg-pink-500"
                        : genderLabel === "Unisex"
                          ? "bg-gray-700"
                          : "bg-gray-400";
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative"
                        style={{ width: "320px", minWidth: "320px", maxWidth: "340px" }}
                      >
                        {/* Imagen y etiqueta de género */}
                        <div className="relative w-full h-72 flex items-center justify-center bg-gray-50">
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = '/placeholder-image.jpg';
                            }}
                          />
                          {genderLabel && (
                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${genderColor}`}>
                              {genderLabel}
                            </span>
                          )}
                        </div>
                        {/* Info producto */}
                        <div className="flex-1 flex flex-col p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                          <div className="mb-2">
                            <span className="text-xl font-bold text-gray-900">S/. {(product.price || 0).toFixed(2)}</span>
                          </div>
                          {/* Selector de cantidad */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">Cantidad:</span>
                            <button
                              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                              onClick={() => handleQuantityChange(product.id, -1)}
                            >-</button>
                            <span className="w-8 text-center">{quantity}</span>
                            <button
                              className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                              onClick={() => handleQuantityChange(product.id, 1)}
                            >+</button>
                          </div>
                          {/* Subtotal */}
                          <div className="mb-4 text-sm text-gray-700">
                            Subtotal: <span className="font-bold">S/. {(product.price * quantity).toFixed(2)}</span>
                          </div>
                          {/* Botón agregar al carrito */}
                          <button
                            onClick={() => handleAddToCart(product, quantity)}
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                          >
                            Agregar al Carrito ({quantity})
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}