import React, { useEffect, useState } from 'react';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a Luxury Clothes{user && ` ${user.name}`}
      </h1>
    </div>
  );
}

export default Home;
