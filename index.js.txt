const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
app.use(bodyParser.json());

// POST /solicitudes
app.post('/solicitudes', (req, res) => {
  const { nombre, motivo, fecha } = req.body;

  if (!nombre || !motivo || !fecha) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const query = 'INSERT INTO solicitudes (nombre, motivo, fecha) VALUES (?, ?, ?)';
  connection.query(query, [nombre, motivo, fecha], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '✅ Solicitud guardada con éxito', id: result.insertId });
  });
});

// GET /solicitudes
app.get('/solicitudes', (req, res) => {
  connection.query('SELECT * FROM solicitudes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /solicitudes/:id
app.get('/solicitudes/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM solicitudes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: '❌ Solicitud no encontrada' });
    res.json(results[0]);
  });
});

// Puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
