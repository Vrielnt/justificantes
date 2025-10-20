const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost', // o la IP de tu servidor MySQL
  user: 'root', // reemplaza con tu usuario
   password: '1234567890',  // Verifica que esta contraseña sea correcta
  database: 'justificantes_db'  // Asegúrate de que esta base de datos existe
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Crear tabla si no existe (opcional)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    grupo VARCHAR(50) NOT NULL,
    motivo TEXT NOT NULL,
    fecha_ausencia DATE NOT NULL,
    estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createTableQuery, (err) => {
  if (err) {
    console.error('Error creando tabla:', err);
  } else {
    console.log('Tabla solicitudes verificada/creada');
  }
});

// Rutas de la API

// GET todas las solicitudes
app.get('/solicitudes', (req, res) => {
  const query = 'SELECT * FROM solicitudes ORDER BY id DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo solicitudes:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    res.json(results);
  });
});

// POST nueva solicitud
app.post('/solicitudes', (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia, estado = 'pendiente' } = req.body;
  
  // Validación
  if (!nombre || !grupo || !motivo || !fecha_ausencia) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = `
    INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia, estado) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(query, [nombre, grupo, motivo, fecha_ausencia, estado], (err, results) => {
    if (err) {
      console.error('Error creando solicitud:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    
    // Obtener la solicitud recién creada
    const getQuery = 'SELECT * FROM solicitudes WHERE id = ?';
    db.query(getQuery, [results.insertId], (err, newResults) => {
      if (err) {
        console.error('Error obteniendo nueva solicitud:', err);
        return res.status(500).json({ error: 'Error del servidor' });
      }
      res.status(201).json(newResults[0]);
    });
  });
});

// PUT actualizar solicitud
app.put('/solicitudes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, grupo, motivo, fecha_ausencia, estado } = req.body;
  
  const query = `
    UPDATE solicitudes 
    SET nombre = ?, grupo = ?, motivo = ?, fecha_ausencia = ?, estado = ? 
    WHERE id = ?
  `;
  
  db.query(query, [nombre, grupo, motivo, fecha_ausencia, estado, id], (err, results) => {
    if (err) {
      console.error('Error actualizando solicitud:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    
    // Obtener la solicitud actualizada
    const getQuery = 'SELECT * FROM solicitudes WHERE id = ?';
    db.query(getQuery, [id], (err, updateResults) => {
      if (err) {
        console.error('Error obteniendo solicitud actualizada:', err);
        return res.status(500).json({ error: 'Error del servidor' });
      }
      res.json(updateResults[0]);
    });
  });
});

// DELETE eliminar solicitud
app.delete('/solicitudes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const query = 'DELETE FROM solicitudes WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error eliminando solicitud:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    
    res.json({ message: 'Solicitud eliminada correctamente' });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});