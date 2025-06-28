import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const usersToSetup = [
  { usuario: 'Administrador', contrasena: 'Administrador12345', rol_id: 1 },
  { usuario: 'Bibliotecario', contrasena: 'Bibliotecario12345', rol_id: 2 },
  { usuario: 'Asistente', contrasena: 'Asistente12345', rol_id: 3 }
];

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function setupUsers() {
  let connection;
  console.log("Iniciando configuración de usuarios...");

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Conexión a la base de datos exitosa.");
    console.log(`DB_HOST: ${dbConfig.host}`);
    console.log(`DB_USER: ${dbConfig.user}`);
    console.log(`DB_PASSWORD: ${'*'.repeat(dbConfig.password.length)}`);
    console.log(`DB_NAME: ${dbConfig.database}`);


    for (const user of usersToSetup) {
      console.log(`\nProcesando usuario: ${user.usuario}...`);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.contrasena, saltRounds);
      console.log(` -> Contraseña para ${user.usuario} hasheada.`);

      const [rows] = await connection.execute(
        'SELECT id FROM usuarios WHERE usuario = ?',
        [user.usuario]
      );

      if (rows.length > 0) {
        await connection.execute(
          'UPDATE usuarios SET contrasena = ? WHERE usuario = ?',
          [hashedPassword, user.usuario]
        );
        console.log(` -> ✅ ¡Éxito! El usuario '${user.usuario}' fue actualizado.`);
      } else {
        await connection.execute(
          'INSERT INTO usuarios (usuario, contrasena, rol_id) VALUES (?, ?, ?)',
          [user.usuario, hashedPassword, user.rol_id]
        );
        console.log(` -> ✅ ¡Éxito! El usuario '${user.usuario}' fue creado.`);
      }
    }

  } catch (error) {
    console.error('❌ Error durante la configuración de usuarios:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nConfiguración de usuarios finalizada. Conexión cerrada.');
    }
  }
}

setupUsers();