const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234567890',  // Verifica que esta contraseña sea correcta
  database: 'justificantes_db'  // Asegúrate de que esta base de datos existe
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    console.error('🔍 Detalles del error:', err);
  } else {
    console.log('✅ Conexión a MySQL exitosa');
  }
});

module.exports = connection;