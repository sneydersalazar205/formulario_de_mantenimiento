CREATE DATABASE IF NOT EXISTS mantenimiento CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mantenimiento;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  modalidad ENUM('remota','presencial') NOT NULL,
  servicios VARCHAR(255) NOT NULL,
  descripcion_pc TEXT,
  descripcion_problema TEXT,
  acepto_terminos TINYINT(1) DEFAULT 0,
  confirmado TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password) VALUES ('admin@example.com', 'admin123');
