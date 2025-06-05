// src/components/pages/Home.jsx

import React from "react";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import Footer from "../layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}