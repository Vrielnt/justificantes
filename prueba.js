// test-connection.js
const connection = require('./db');

// Probar consulta simple
connection.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('❌ Error en consulta de prueba:', err.message);
  } else {
    console.log('✅ Consulta de prueba exitosa. Resultado:', results[0].solution);
  }
  connection.end();
});