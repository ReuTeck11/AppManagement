const express = require('express');
const app = express();
const sequelize = require('./config/db'); // Asegurarte de importar la conexión
const productosRoutes = require('./routes/productos');

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/productos', productosRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

    // Sincronizar la base de datos
    sequelize.sync({ force: false }).then(() => {
        console.log('Base de datos sincronizada');
    }).catch(err => console.log('Error al sincronizar la base de datos:', err));
});
