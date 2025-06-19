import React, { useState, useContext } from "react";
import { FaThLarge, FaList, FaChevronDown, FaChevronUp, FaShoppingCart, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { CartContext } from "../../src/context/CartContext";

const allProducts = [
  // PRODUCTOS PARA MUJER
  {
    id: 1,
    name: "Elegante Vestido Negro",
    price: 189.00,
    originalPrice: null,
    brand: "Elegant Fashion",
    category: "Vestidos",
    color: "Negro",
    size: "M",
    collection: "Nuevos",
    gender: "Mujer",
    tags: ["Dress", "Elegant", "Party"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "navy"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Blusa de Seda Floral",
    price: 125.00,
    originalPrice: null,
    brand: "Silk Style",
    category: "Blusas",
    color: "Rosa",
    size: "S",
    collection: "Bestsellers",
    gender: "Mujer",
    tags: ["Blouse", "Silk", "Floral"],
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop&crop=center",
    colors: ["pink", "white"],
    rating: 4.7
  },
  {
    id: 3,
    name: "Falda Midi Plisada",
    price: 98.00,
    originalPrice: 120.00,
    brand: "Modern Skirts",
    category: "Faldas",
    color: "Beige",
    size: "M",
    collection: "Ofertas",
    gender: "Mujer",
    tags: ["Skirt", "Midi", "Pleated"],
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=500&fit=crop&crop=center",
    colors: ["beige", "black"],
    rating: 4.5
  },
  {
    id: 4,
    name: "Tacones de Cuero",
    price: 156.00,
    originalPrice: null,
    brand: "Luxury Heels",
    category: "Zapatos",
    color: "Negro",
    size: "L",
    collection: "Vintage",
    gender: "Mujer",
    tags: ["Heels", "Leather", "Elegant"],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "brown"],
    rating: 4.9
  },
  {
    id: 5,
    name: "Bolso de Mano Premium",
    price: 210.00,
    originalPrice: null,
    brand: "Luxury Bags",
    category: "Accesorios",
    color: "Negro",
    size: "M",
    collection: "Nuevos",
    gender: "Mujer",
    tags: ["Handbag", "Premium", "Luxury"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "brown"],
    rating: 4.8
  },

  // PRODUCTOS PARA HOMBRE
  {
    id: 6,
    name: "Camisa Formal Blanca",
    price: 145.00,
    originalPrice: null,
    brand: "Formal Wear",
    category: "Camisas",
    color: "Blanco",
    size: "L",
    collection: "Bestsellers",
    gender: "Hombre",
    tags: ["Shirt", "Formal", "Business"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop&crop=center",
    colors: ["white", "blue"],
    rating: 4.7
  },
  {
    id: 7,
    name: "Pantalón Chino Casual",
    price: 89.00,
    originalPrice: 110.00,
    brand: "Casual Men",
    category: "Pantalones",
    color: "Gris",
    size: "M",
    collection: "Ofertas",
    gender: "Hombre",
    tags: ["Pants", "Chino", "Casual"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop&crop=center",
    colors: ["gray", "black"],
    rating: 4.4
  },
  {
    id: 8,
    name: "Chaqueta de Cuero",
    price: 299.00,
    originalPrice: null,
    brand: "Leather Co",
    category: "Chaquetas",
    color: "Negro",
    size: "L",
    collection: "Vintage",
    gender: "Hombre",
    tags: ["Jacket", "Leather", "Rock"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "brown"],
    rating: 4.9
  },
  {
    id: 9,
    name: "Zapatos Oxford",
    price: 189.00,
    originalPrice: null,
    brand: "Classic Shoes",
    category: "Zapatos",
    color: "Negro",
    size: "M",
    collection: "Nuevos",
    gender: "Hombre",
    tags: ["Shoes", "Oxford", "Formal"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "brown"],
    rating: 4.6
  },
  {
    id: 10,
    name: "Polo Deportivo",
    price: 67.00,
    originalPrice: 85.00,
    brand: "Sport Style",
    category: "Polos",
    color: "Azul",
    size: "L",
    collection: "Ofertas",
    gender: "Hombre",
    tags: ["Polo", "Sport", "Casual"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=center",
    colors: ["blue", "red"],
    rating: 4.3
  },

  // PRODUCTOS UNISEX
  {
    id: 11,
    name: "Gafas de Sol Aviador",
    price: 156.00,
    originalPrice: 194.00,
    brand: "Sun Protection",
    category: "Accesorios",
    color: "Negro",
    size: "M",
    collection: "Ofertas",
    gender: "Unisex",
    tags: ["Sunglasses", "Aviator", "Protection"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "blue"],
    rating: 4.8
  },
  {
    id: 12,
    name: "Reloj Minimalista",
    price: 234.00,
    originalPrice: null,
    brand: "Time Style",
    category: "Accesorios",
    color: "Negro",
    size: "M",
    collection: "Nuevos",
    gender: "Unisex",
    tags: ["Watch", "Minimal", "Elegant"],
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&crop=center",
    colors: ["black", "white"],
    rating: 4.9
  }
];

const sizeOptions = ["S", "M", "L", "XL"];
const colorOptions = [
  { name: "Rojo", value: "red", hex: "#EF4444" },
  { name: "Naranja", value: "orange", hex: "#F97316" },
  { name: "Amarillo", value: "yellow", hex: "#EAB308" },
  { name: "Verde", value: "green", hex: "#22C55E" },
  { name: "Azul", value: "blue", hex: "#3B82F6" },
  { name: "Índigo", value: "indigo", hex: "#6366F1" },
  { name: "Púrpura", value: "purple", hex: "#A855F7" },
  { name: "Rosa", value: "pink", hex: "#EC4899" },
  { name: "Negro", value: "black", hex: "#000000" },
  { name: "Gris", value: "gray", hex: "#6B7280" },
  { name: "Blanco", value: "white", hex: "#FFFFFF" },
  { name: "Beige", value: "beige", hex: "#D4B896" }
];

const priceRanges = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "$150 - $200", min: 150, max: 200 },
  { label: "$200+", min: 200, max: Infinity }
];

const genderOptions = ["Todos", "Hombre", "Mujer", "Unisex"];
const categories = ["Todos", "Vestidos", "Blusas", "Faldas", "Zapatos", "Camisas", "Pantalones", "Chaquetas", "Polos", "Accesorios"];
const brands = ["Elegant Fashion", "Silk Style", "Modern Skirts", "Luxury Heels", "Luxury Bags", "Formal Wear", "Casual Men", "Leather Co", "Classic Shoes", "Sport Style", "Sun Protection", "Time Style"];
const collections = ["Todos", "Nuevos", "Bestsellers", "Vintage", "Ofertas"];
const tags = ["Dress", "Elegant", "Party", "Blouse", "Silk", "Floral", "Skirt", "Midi", "Pleated", "Heels", "Leather", "Handbag", "Premium", "Luxury", "Shirt", "Formal", "Business", "Pants", "Chino", "Casual", "Jacket", "Rock", "Shoes", "Oxford", "Polo", "Sport", "Sunglasses", "Aviator", "Protection", "Watch", "Minimal"];

export default function Shop() {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("Todos");
  const [selectedGender, setSelectedGender] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("best-selling");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [openSections, setOpenSections] = useState({
    brands: false,
    collections: false,
    tags: false
  });

  const { cart, addToCart } = useContext(CartContext);
  const itemsPerPage = 6;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handlePriceChange = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleTagChange = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = allProducts.filter(product => {
    // Filtro por tallas
    if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) {
      return false;
    }

    // Filtro por colores
    if (selectedColors.length > 0) {
      const productColorValue = colorOptions.find(c => c.name === product.color)?.value;
      if (!selectedColors.includes(productColorValue)) {
        return false;
      }
    }

    // Filtro por precio
    if (selectedPriceRanges.length > 0) {
      const matchesPriceRange = selectedPriceRanges.some(range => 
        product.price >= range.min && product.price <= range.max
      );
      if (!matchesPriceRange) {
        return false;
      }
    }

    // Filtro por marcas
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Filtro por colección
    if (selectedCollection !== "Todos" && product.collection !== selectedCollection) {
      return false;
    }

    // Filtro por género
    if (selectedGender !== "Todos" && product.gender !== selectedGender) {
      return false;
    }

    // Filtro por categoría
    if (selectedCategory !== "Todos" && product.category !== selectedCategory) {
      return false;
    }

    // Filtro por tags
    if (selectedTags.length > 0) {
      const hasMatchingTag = selectedTags.some(tag => product.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });

  // Ordenamiento
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "best-selling":
      default:
        return b.rating - a.rating;
    }
  });

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRanges([]);
    setSelectedBrands([]);
    setSelectedCollection("Todos");
    setSelectedGender("Todos");
    setSelectedCategory("Todos");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <nav className="text-sm">
              <span className="text-gray-500">Inicio</span>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900 font-medium">Fashion</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar de Filtros */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Limpiar todo
                  </button>
                </div>

                {/* Filtro por Género */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Género</h3>
                  <div className="space-y-2">
                    {genderOptions.map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          checked={selectedGender === gender}
                          onChange={() => setSelectedGender(gender)}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <span className="ml-2 text-sm text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Categoría */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Categoría</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Tallas */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Talla</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map(size => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedSizes.includes(size)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por Colores */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        onClick={() => handleColorChange(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color.value)
                            ? 'border-gray-800 scale-110'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Filtro por Precio */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Precio</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.label} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range)}
                          onChange={() => handlePriceChange(range)}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por Marcas */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('brands')}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">Marcas</h3>
                    {openSections.brands ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                  {openSections.brands && (
                    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="ml-2 text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtro por Colecciones */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('collections')}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">Colecciones</h3>
                    {openSections.collections ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                  {openSections.collections && (
                    <div className="mt-3 space-y-2">
                      {collections.map(collection => (
                        <label key={collection} className="flex items-center">
                          <input
                            type="radio"
                            name="collection"
                            checked={selectedCollection === collection}
                            onChange={() => setSelectedCollection(collection)}
                            className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                          />
                          <span className="ml-2 text-sm text-gray-700">{collection}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Filtro por Tags */}
                <div className="mb-6">
                  <button
                    onClick={() => toggleSection('tags')}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">Tags</h3>
                    {openSections.tags ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                  {openSections.tags && (
                    <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                      {tags.map(tag => (
                        <label key={tag} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTags.includes(tag)}
                            onChange={() => handleTagChange(tag)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="ml-2 text-sm text-gray-700">{tag}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Área de Productos */}
            <div className="lg:w-3/4">
              {/* Header de Productos */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Fashion</h1>
                
                <div className="flex items-center gap-4">
                  {/* Ordenamiento */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:border-black"
                  >
                    <option value="best-selling">Más vendido</option>
                    <option value="price-low">Precio: Menor a mayor</option>
                    <option value="price-high">Precio: Mayor a menor</option>
                    <option value="name">Nombre A-Z</option>
                  </select>

                  {/* Vista Grid/Lista */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-700'}`}
                    >
                      <FaThLarge size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-700'}`}
                    >
                      <FaList size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de Productos */}
              <div className={`grid gap-6 mb-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {paginatedProducts.map(product => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                        }`}
                      />
                      {product.originalPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Oferta
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.gender}
                      </div>
                    </div>
                    
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-gray-900">
                          S/. {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            S/. {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      {/* Colores disponibles */}
                      <div className="flex gap-1 mb-4">
                        {product.colors.map(colorValue => {
                          const colorOption = colorOptions.find(c => c.value === colorValue);
                          return colorOption ? (
                            <div
                              key={colorValue}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: colorOption.hex }}
                            />
                          ) : null;
                        })}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mensaje si no hay productos */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No se encontraron productos con los filtros seleccionados.</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-lg border transition-colors ${
                        currentPage === index + 1
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Carrito flotante - Copiado desde Hero.jsx */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
          {/* Carrito flotante con funcionalidad completa */}
          <Link 
            to="/carrito"
            className="relative bg-black text-white p-4 rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group"
          >
            <FaShoppingCart size={20} className="transform group-hover:rotate-12 transition-transform duration-300" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-md animate-bounce">
                {cart.length > 99 ? '99+' : cart.length}
              </span>
            )}
          </Link>
          
          {/* Botón back to top */}
          <button 
            onClick={scrollToTop}
            className="bg-white text-black p-4 rounded-full shadow-xl hover:bg-gray-100 hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border border-gray-200 group"
          >
            <FaArrowUp size={20} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}