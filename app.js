const express = require('express');
const cors = require('cors');
const app = express();
const solicitudesRoutes = require('./routes/solicitudes');

app.use(cors());
app.use(express.json());

// Ruta base para solicitudes
app.use('/solicitudes', solicitudesRoutes);

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});