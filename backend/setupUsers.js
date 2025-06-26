// setupUsers.js
// Propósito: Script de un solo uso para crear o actualizar los usuarios 
// del sistema con contraseñas hasheadas de forma segura.

import bcrypt from 'bcrypt';
import connection from './src/utils/db.js'; // Asegúrate que la ruta a tu conexión sea correcta

// Array con la información de los usuarios que queremos crear/actualizar
const users = [
  {
    username: 'Administrador',
    password: 'Administrador12345',
    role_id: 1,
  },
  {
    username: 'Bibliotecario',
    password: 'Bibliotecario12345',
    role_id: 2,
  },
  {
    username: 'Asistente',
    password: 'Asistente12345',
    role_id: 3,
  },
];

const setupUsers = async () => {
  try {
    console.log("Iniciando configuración de usuarios...");

    // Usamos un bucle 'for...of' para procesar cada usuario uno por uno
    for (const user of users) {
      console.log(`\nProcesando usuario: ${user.username}...`);

      // 1. Hashear la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      console.log(` -> Contraseña para ${user.username} hasheada.`);

      // 2. Actualizar el usuario en la base de datos
      const query = `
        UPDATE usuarios 
        SET contrasena = ? 
        WHERE usuario = ? AND rol_id = ?`;
      
      const [result] = await connection.query(query, [hashedPassword, user.username, user.role_id]);

      if (result.affectedRows > 0) {
        console.log(` -> ✅ ¡Éxito! El usuario '${user.username}' fue actualizado.`);
      } else {
        console.error(` -> ❌ Error: No se encontró al usuario '${user.username}'. Asegúrate de haber ejecutado el script SQL primero.`);
      }
    }

    console.log("\nConfiguración de usuarios finalizada con éxito.");

  } catch (error) {
    console.error("Falló la configuración de usuarios:", error);
  } finally {
    // Cierra la conexión a la base de datos para que el script termine
    await connection.end();
  }
};

// Ejecutar la función
setupUsers();
