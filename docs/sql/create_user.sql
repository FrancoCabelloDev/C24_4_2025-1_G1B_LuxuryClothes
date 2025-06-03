CREATE DATABASE IF NOT EXISTS luxuryclothes
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish2_ci;

USE luxuryclothes;

CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(100),
    contraseña VARCHAR(255) NOT NULL,
    celular VARCHAR(30),
    direccion VARCHAR(255),
    dni VARCHAR(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
