// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Rutas
const solicitudesRoutes = require('./routes/solicitudes');
app.use('/solicitudes', solicitudesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});