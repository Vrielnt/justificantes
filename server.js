const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos si los tienes

// Datos en memoria
let solicitudes = [];
let nextId = 1;

// Rutas de la API

// GET todas las solicitudes
app.get('/solicitudes', (req, res) => {
  res.json(solicitudes);
});

// POST nueva solicitud
app.post('/solicitudes', (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia, estado = 'pendiente' } = req.body;
  
  // Validación básica
  if (!nombre || !grupo || !motivo || !fecha_ausencia) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const nuevaSolicitud = {
    id: nextId++,
    nombre,
    grupo,
    motivo,
    fecha_ausencia,
    estado,
    fecha_creacion: new Date().toISOString()
  };
  
  solicitudes.push(nuevaSolicitud);
  res.status(201).json(nuevaSolicitud);
});

// PUT actualizar solicitud
app.put('/solicitudes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = solicitudes.findIndex(s => s.id === id);
  
  if (index !== -1) {
    solicitudes[index] = { 
      ...solicitudes[index], 
      ...req.body,
      id: id // Asegurar que el ID no se modifique
    };
    res.json(solicitudes[index]);
  } else {
    res.status(404).json({ error: 'Solicitud no encontrada' });
  }
});

// DELETE eliminar solicitud
app.delete('/solicitudes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = solicitudes.findIndex(s => s.id === id);
  
  if (index !== -1) {
    solicitudes.splice(index, 1);
    res.json({ message: 'Solicitud eliminada correctamente' });
  } else {
    res.status(404).json({ error: 'Solicitud no encontrada' });
  }
});

// Ruta para servir el HTML principal (opcional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});