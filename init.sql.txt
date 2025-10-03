CREATE DATABASE IF NOT EXISTS justificantes_db;

USE justificantes_db;

CREATE TABLE IF NOT EXISTS solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    motivo TEXT NOT NULL,
    fecha DATE NOT NULL
);
