-- Conéctate a MySQL y ejecuta estos comandos
CREATE DATABASE IF NOT EXISTS justificantes_db;
USE justificantes_db;

CREATE TABLE IF NOT EXISTS solicitudes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  grupo VARCHAR(10) NOT NULL,
  motivo TEXT NOT NULL,
  fecha_ausencia DATE NOT NULL,
  estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);