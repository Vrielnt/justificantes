const express = require('express');
const router = express.Router();
const db = require('../db/connection');


// POST /solicitudes → Registrar solicitud
router.post('/', (req, res) => {
  const { nombre, grupo, motivo, fecha_ausencia } = req.body;

  if (!nombre || !grupo || !motivo || !fecha_ausencia) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = `
    INSERT INTO solicitudes (nombre, grupo, motivo, fecha_ausencia)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [nombre, grupo, motivo, fecha_ausencia], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar solicitud' });
    res.status(201).json({ message: 'Solicitud registrada', id: result.insertId });
  });
});

// GET /solicitudes → Consultar todas las solicitudes
router.get('/', (req, res) => {
  db.query('SELECT * FROM solicitudes ORDER BY fecha_solicitud DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener solicitudes' });
    res.json(results);
  });
});

// GET /solicitudes/:id → Ver una solicitud específica
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM solicitudes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar solicitud' });
    if (results.length === 0) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(results[0]);
  });
});

module.exports = router;