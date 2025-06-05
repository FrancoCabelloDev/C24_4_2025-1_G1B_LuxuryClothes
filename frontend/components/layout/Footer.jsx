import React from "react";
import BrandLogos from "./BrandLogos";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <BrandLogos />

      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto py-12 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Empresa */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Empresa</h3>
              <p>Luxury Clothes S.A.</p>
              <p>Av. Principal 123, Lima, Perú</p>
              <p>RUC: 123456789</p>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Contacto</h3>
              <p>
                Email:{" "}
                <a href="mailto:info@luxuryclothes.com" className="hover:underline">
                  info@luxuryclothes.com
                </a>
              </p>
              <p>
                Teléfono:{" "}
                <a href="tel:+51987654321" className="hover:underline">
                  +51 987 654 321
                </a>
              </p>
              <p>Horario: Lun–Vie 9:00–18:00</p>
            </div>

            {/* Redes Sociales */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-blue-500 transition">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="hover:text-pink-500 transition">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="hover:text-blue-400 transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="hover:text-blue-700 transition">
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
