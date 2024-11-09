const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

// Rutas para roles
router.get('/', rolesController.getRoles);               // Obtener todos los roles
router.post('/', rolesController.createRole);            // Crear un nuevo rol
router.put('/:id', rolesController.updateRole);          // Actualizar un rol
router.delete('/:id', rolesController.deleteRole);       // Eliminar un rol

module.exports = router;
