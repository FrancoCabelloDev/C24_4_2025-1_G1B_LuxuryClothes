-- Script para crear la base de datos y la tabla 'usuarios' compatible con tu entidad User

CREATE DATABASE IF NOT EXISTS luxury_clothes
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish2_ci;

USE luxury_clothes;

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro DATETIME
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;
