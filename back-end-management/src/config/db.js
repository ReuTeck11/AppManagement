require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuración de Sequelize utilizando variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host de la base de datos
        dialect: 'mysql', // Usamos MySQL como dialecto
        pool: {
            max: 10, // Límite máximo de conexiones
            min: 0,  // Límite mínimo de conexiones
            acquire: 30000, // Tiempo máximo en ms para adquirir conexión
            idle: 10000 // Tiempo en ms que una conexión puede estar inactiva antes de ser liberada
        },
        logging: false // Desactivar logs de Sequelize (opcional)
    }
);

// Verificar la conexión
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();

module.exports = sequelize;
