import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-20 relative">
        
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          {/* Modelo Masculino - Izquierda */}
          <div className="hidden lg:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl z-10"></div>
              <img
                src="/model4.jpg"
                alt="Modelo masculino joven con abrigo elegante de cuerpo completo"
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Contenido Central - Newsletter */}
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Suscríbete A Nuestro Newsletter
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                Mantente al día con las últimas tendencias, ofertas exclusivas y nuevas colecciones. 
                Sé el primero en conocer nuestros lanzamientos especiales.
              </p>
            </div>

            {/* Formulario de Suscripción */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu-email@ejemplo.com"
                  required
                  className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-full focus:border-black focus:outline-none transition-colors duration-300 text-center"
                />
              </div>

              <button
                type="submit"
                disabled={isSubscribed}
                className={`w-full px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl ${
                  isSubscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isSubscribed ? '¡Suscrito Exitosamente!' : 'Suscribirse Ahora'}
              </button>
            </form>

            {/* Mensaje de confirmación */}
            {isSubscribed && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                ¡Gracias por suscribirte! Recibirás nuestras últimas actualizaciones.
              </div>
            )}

            {/* Beneficios de suscribirse */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>✓ Ofertas exclusivas para suscriptores</p>
              <p>✓ Acceso anticipado a nuevas colecciones</p>
              <p>✓ Descuentos especiales en tu cumpleaños</p>
            </div>
          </div>

          {/* Modelo Femenino - Derecha */}
          <div className="hidden lg:block">
            <div className="relative">
              <img
                src="/model3.jpg"
                alt="Modelo femenino con blazer elegante"
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500 rounded-2xl shadow-xl"
              />
            </div>
          </div>

        </div>

        {/* Versión móvil - Imágenes como fondo */}
        <div className="lg:hidden absolute inset-0 flex justify-between items-center pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=300&fit=crop&crop=faces"
            alt="Modelo masculino"
            className="w-24 h-36 object-cover rounded-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=300&fit=crop&crop=faces"
            alt="Modelo femenino"
            className="w-24 h-36 object-cover rounded-lg"
          />
        </div>

      </div>
    </section>
  );
}