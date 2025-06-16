import React, { useState, useContext } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { CartContext } from "../../src/context/CartContext";

const allProducts = [
  {
    id: 1,
    name: "Chaqueta Gucci Oversized",
    price: 1499.99,
    brand: "Gucci",
    category: "Chaquetas",
    color: "Negro",
    style: "Oversized",
    image: "/products/gucci-jacket.jpg",
  },
  {
    id: 2,
    name: "Zapatillas Louis Vuitton Runner",
    price: 1299.99,
    brand: "Louis Vuitton",
    category: "Zapatillas",
    size: "42",
    gender: "Hombre",
    image: "/products/lv-shoes.jpg",
  },
  {
    id: 3,
    name: "Bolso Chanel Vintage",
    price: 1799.99,
    brand: "Chanel",
    category: "Accesorios",
    material: "Cuero",
    image: "/products/chanel-bag.jpg",
  },
  {
    id: 4,
    name: "Camisa Prada Silk",
    price: 899.99,
    brand: "Prada",
    category: "Polos",
    material: "Algodón",
    sleeve: "Corta",
    image: "/products/prada-shirt.jpg",
  },
];

const brands = ["Todos", "Gucci", "Louis Vuitton", "Chanel", "Prada"];
const categories = ["Todos", "Zapatillas", "Chaquetas", "Polos", "Accesorios"];

const filtersByCategory = {
  Zapatillas: {
    size: ["40", "41", "42", "43"],
    gender: ["Hombre", "Mujer"],
  },
  Chaquetas: {
    color: ["Negro", "Beige", "Rojo"],
    style: ["Oversized", "Slim", "Clásico"],
  },
  Polos: {
    material: ["Algodón", "Poliéster", "Lino"],
    sleeve: ["Corta", "Larga"],
  },
  Accesorios: {
    material: ["Cuero", "Sintético"],
  },
};

export default function Offers() {
  const [selectedBrand, setSelectedBrand] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filters, setFilters] = useState({});
  const { addToCart } = useContext(CartContext);

  const dynamicFilters = filtersByCategory[selectedCategory] || {};

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "Todos" ? null : value,
    }));
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchBrand =
      selectedBrand === "Todos" || product.brand === selectedBrand;
    const matchCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;

    const matchSubfilters = Object.entries(filters).every(([key, val]) => {
      return !val || product[key] === val;
    });

    return matchBrand && matchCategory && matchSubfilters;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-extrabold text-center mb-10">Ofertas Exclusivas</h1>

        {/* FILTRO POR MARCA (estilo anterior) */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedBrand === brand
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* CATEGORÍA Y SUBFILTROS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFilters({});
            }}
            className="border border-gray-300 rounded px-4 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Categoría: {cat}
              </option>
            ))}
          </select>

          {Object.entries(dynamicFilters).map(([key, values]) => (
            <select
              key={key}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="Todos">{key.charAt(0).toUpperCase() + key.slice(1)}: Todos</option>
              {values.map((option) => (
                <option key={option} value={option}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {option}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* PRODUCTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-lg text-gray-800 font-bold mt-2">S/. {product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No hay productos disponibles.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
