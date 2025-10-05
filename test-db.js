// test-db.js
const mysql = require('mysql2');

// Configura tu conexión (ajusta estos valores según tu entorno)
const connection = mysql.createConnection({
 host: 'localhost',
  user: 'root',
  password: '1234567890',
  database: 'justificantes_db'
});

// Intentamos conectar
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos MySQL');

  // Opcional: hacer una consulta de prueba
  connection.query('SELECT COUNT(*) AS total FROM solicitudes', (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta:', err.message);
    } else {
      console.log(`📦 Total de solicitudes registradas: ${results[0].total}`);
    }

    // Cerramos la conexión
    connection.end();
  });
});