const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Definir las rutas para usuarios
router.get('/', usuariosController.getUsuarios);          // Obtener todos los usuarios
router.get('/:id', usuariosController.getUsuarioById);    // Obtener un usuario por ID
router.post('/', usuariosController.createUsuario);       // Crear un nuevo usuario
router.put('/:id', usuariosController.updateUsuario);     // Actualizar un usuario
router.delete('/:id', usuariosController.deleteUsuario);  // Eliminar un usuario

module.exports = router;
