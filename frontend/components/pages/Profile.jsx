import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    celular: "",
    direccion: "",
    dni: "",
  });
  const navigate = useNavigate();

  // 🔄 Cargar datos del usuario desde el backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      alert("No hay usuario autenticado");
      navigate("/login");
      return;
    }
    setFormData((prev) => ({ ...prev, email: user.email }));
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8084/api/user/profile?email=${encodeURIComponent(
            user.email
          )}`
        );
        setFormData(res.data);
      } catch (err) {
        alert("Error al cargar datos del perfil");
        console.error(err);
      }
    };

    fetchUserData();
  }, [navigate]);

  // 🔁 Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 💾 Enviar actualización al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8084/api/user/profile", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Perfil actualizado correctamente");
    } catch (err) {
      alert("Error al actualizar perfil");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>

        <label className="block mb-2">Nombre</label>
        <input
          name="nombre"
          value={formData.nombre || ""}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2">Celular</label>
        <input
          name="celular"
          value={formData.celular || ""}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Dirección</label>
        <input
          name="direccion"
          value={formData.direccion || ""}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">DNI</label>
        <input
          name="dni"
          value={formData.dni || ""}
          onChange={handleChange}
          className="w-full p-2 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default Profile;
