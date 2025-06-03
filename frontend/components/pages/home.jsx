import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a Luxury Clothes{user && ` ${user.nombre}`}
      </h1>
      <button
        onClick={goToProfile}
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Editar Perfil
      </button>
    </div>
  );
}

export default Home;
