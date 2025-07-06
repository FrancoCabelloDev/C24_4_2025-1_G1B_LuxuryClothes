import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaEdit, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: '',
    celular: '',
    direccion: '',
    dni: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.email) {
      navigate('/login');
      return;
    }
    
    // Obtener datos actualizados del backend
    axios.get(`http://localhost:8084/api/user/profile?email=${encodeURIComponent(storedUser.email)}`)
      .then(res => {
        setUser(res.data);
        setForm({
          nombre: res.data.nombre || '',
          celular: res.data.celular || '',
          direccion: res.data.direccion || '',
          dni: res.data.dni || ''
        });
        setLoading(false);
      })
      .catch(() => {
        alert('Error al cargar datos del perfil');
        navigate('/login');
      });
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setForm({
      nombre: user.nombre || '',
      celular: user.celular || '',
      direccion: user.direccion || '',
      dni: user.dni || ''
    });
    setEditMode(false);
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const updated = {
        ...user,
        nombre: form.nombre,
        celular: form.celular,
        direccion: form.direccion,
        dni: form.dni
      };
      await axios.put('http://localhost:8084/api/user/profile', updated, {
        headers: { 'Content-Type': 'application/json' }
      });
      setUser(updated);
      setEditMode(false);
      alert('Perfil actualizado correctamente');
    } catch {
      alert('Error al actualizar perfil');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-gray-900 text-xl">Cargando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-20 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Inicio
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Perfil de Usuario</span>
          </nav>
        </div>

        {/* Header del perfil */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              <FaArrowLeft size={16} />
              Volver a la Tienda
            </button>
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Mi Perfil
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar - Información básica */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              
              {/* Avatar y nombre */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-gray-200">
                  <FaUser className="text-gray-500 text-4xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {user.nombre || 'Cliente'}
                </h2>
                <p className="text-gray-600 text-sm">
                  Miembro de Luxury Clothes
                </p>
              </div>

              {/* Información rápida */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaIdCard className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">DNI</p>
                    <p className="text-gray-900 font-medium">
                      {user.dni || 'No registrado'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaPhone className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Teléfono</p>
                    <p className="text-gray-900 font-medium">
                      {user.celular || 'No registrado'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <FaEnvelope className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-gray-900 font-medium text-sm break-all">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-gray-900 font-semibold mb-4">Estadísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-xs text-gray-500">Pedidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">S/. 0</div>
                    <div className="text-xs text-gray-500">Total gastado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal - Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              
              {/* Header del formulario */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Información Personal
                </h2>
                {!editMode ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <FaEdit size={16} />
                    Editar Perfil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <FaSave size={16} />
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      <FaTimes size={16} />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              {/* Formulario */}
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Nombre completo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors"
                      placeholder="Ingresa tu nombre completo"
                    />
                  ) : (
                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900">
                      {user.nombre || 'No especificado'}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-600">
                    {user.email}
                    <span className="text-xs text-gray-500 block mt-1">
                      El email no se puede modificar
                    </span>
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Teléfono
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="celular"
                      value={form.celular}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors"
                      placeholder="+51 999 999 999"
                    />
                  ) : (
                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900">
                      {user.celular || 'No especificado'}
                    </div>
                  )}
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  {editMode ? (
                    <textarea
                      name="direccion"
                      value={form.direccion}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors resize-none"
                      placeholder="Ingresa tu dirección completa"
                    />
                  ) : (
                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 min-h-[80px]">
                      {user.direccion || 'No especificado'}
                    </div>
                  )}
                </div>

                {/* DNI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento de Identidad (DNI)
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="dni"
                      value={form.dni}
                      onChange={handleChange}
                      maxLength={8}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-black focus:border-black transition-colors"
                      placeholder="12345678"
                    />
                  ) : (
                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900">
                      {user.dni || 'No especificado'}
                    </div>
                  )}
                </div>

              </form>

              {/* Información adicional */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información de la Cuenta
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Miembro desde:</span>
                    <span className="text-gray-900 ml-2">Enero 2024</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Último acceso:</span>
                    <span className="text-gray-900 ml-2">Hoy</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Estado:</span>
                    <span className="text-green-600 ml-2">● Activo</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Verificado:</span>
                    <span className="text-green-600 ml-2">✓ Email verificado</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}