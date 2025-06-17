// src/components/pages/Home.jsx

import React from "react";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import NewArrivals from "../layout/NewArrivals";
import DealsSection from "../layout/DealsSection";
import FeaturedProduct from "../layout/FeaturedProduct";
import Newsletter from "../layout/Newsletter";
import Footer from "../layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <Hero />
      <NewArrivals />
      <DealsSection />
      <FeaturedProduct />
      <Newsletter />
      <Footer />
    </div>
  );
}