import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaUser, FaMapMarkerAlt, FaLock, FaCheck, FaSpinner } from "react-icons/fa";
import { CartContext } from "../../src/context/CartContext";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Reemplaza por tu public key de Stripe
const stripePromise = loadStripe("pk_test_51Ri82WQNoJkzaIdZnWSJaY0MMbHvuSgOdKzMM0WMZEUB3G3DR2gcUxGappXcKTKEPMOBsjpu1tcGueYHoboIJ7Fq00Pfzw8FhM");

function StripeCheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    // Llama a tu backend para crear el PaymentIntent
    const res = await fetch("http://localhost:8084/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (!data.clientSecret) {
      setError("No se pudo iniciar el pago.");
      setProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
      onSuccess();
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement options={{ hidePostalCode: true }} className="p-4 border rounded-lg" />
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
      >
        {processing ? "Procesando..." : "Pagar con Tarjeta"}
      </button>
    </form>
  );
}

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Estados del formulario
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: 'Lima',
    district: '',
    postalCode: '',
    country: 'Perú'
  });

  // Calcular totales
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.18; // IGV 18%
  const total = subtotal + shipping + tax;

  // Redirigir si el carrito está vacío
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <Link 
              to="/productos"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Ir a Productos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (section, field, value) => {
    if (section === 'customer') {
      setCustomerInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone;
      case 2:
        return shippingInfo.address && shippingInfo.district && shippingInfo.postalCode;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const generateOrderId = () => {
    return 'LC' + Date.now().toString().slice(-8);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-600 text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
              <p className="text-gray-600">Tu pedido ha sido procesado correctamente</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Número de Orden:</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Pagado:</span>
                  <span className="font-bold text-green-600">S/. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email de Confirmación:</span>
                  <span>{customerInfo.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Te hemos enviado un email de confirmación con los detalles de tu pedido. 
                Tu compra será enviada en 2-3 días hábiles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/productos"
                  className="flex-1 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center"
                >
                  Seguir Comprando
                </Link>
                <Link 
                  to="/"
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center"
                >
                  Ir al Inicio
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FaSpinner className="text-4xl text-black animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Procesando tu pago...</h2>
            <p className="text-gray-600">Por favor espera mientras confirmamos tu transacción</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-20 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/carrito" className="text-gray-500 hover:text-gray-700 transition-colors">
              Carrito
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Finalizar Compra</h1>
          <Link 
            to="/carrito"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <FaArrowLeft size={16} />
            Volver al Carrito
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step <= currentStep 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-gray-400 border-gray-300'
                }`}>
                  {step === 1 && <FaUser size={16} />}
                  {step === 2 && <FaMapMarkerAlt size={16} />}
                  {step === 3 && <FaCreditCard size={16} />}
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step < currentStep ? 'bg-black' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium">
            <span className={currentStep >= 1 ? 'text-black' : 'text-gray-400'}>Información Personal</span>
            <span className={currentStep >= 2 ? 'text-black' : 'text-gray-400'}>Dirección de Envío</span>
            <span className={currentStep >= 3 ? 'text-black' : 'text-gray-400'}>Método de Pago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              
              {/* Paso 1: Información Personal */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange('customer', 'firstName', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos *</label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange('customer', 'lastName', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="Tus apellidos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 2: Dirección de Envío */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Dirección de Envío</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                        placeholder="Av. Ejemplo 123, Dpto 456"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Distrito *</label>
                        <select
                          value={shippingInfo.district}
                          onChange={(e) => handleInputChange('shipping', 'district', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                        >
                          <option value="">Seleccionar distrito</option>
                          <option value="Miraflores">Miraflores</option>
                          <option value="San Isidro">San Isidro</option>
                          <option value="Barranco">Barranco</option>
                          <option value="La Molina">La Molina</option>
                          <option value="Surco">Surco</option>
                          <option value="San Borja">San Borja</option>
                          <option value="Otros">Otros</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal *</label>
                        <input
                          type="text"
                          value={shippingInfo.postalCode}
                          onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black"
                          placeholder="15001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                        <input
                          type="text"
                          value={shippingInfo.country}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-black bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Paso 3: Método de Pago */}
              {currentStep === 3 && (
                <Elements stripe={stripePromise}>
                  <StripeCheckoutForm
                    amount={total}
                    onSuccess={() => {
                      clearCart();
                      setOrderComplete(true);
                      setOrderId(generateOrderId());
                    }}
                  />
                </Elements>
              )}

              {/* Botones de navegación */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <FaArrowLeft size={14} />
                    Anterior
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className={`ml-auto px-6 py-3 rounded-lg font-medium transition-colors ${
                      validateStep(currentStep)
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continuar
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h3>
              
              {/* Productos */}
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Cantidad: {item.quantity || 1}</p>
                      <p className="text-sm font-bold">S/. {(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>S/. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>{shipping === 0 ? 'GRATIS' : `S/. ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>IGV (18%):</span>
                  <span>S/. {tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>S/. {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Seguridad */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaLock className="text-green-600" />
                  <span className="text-sm font-medium">Pago 100% Seguro</span>
                </div>
                <p className="text-xs text-gray-600">
                  Tus datos están protegidos con encriptación SSL de 256 bits
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}