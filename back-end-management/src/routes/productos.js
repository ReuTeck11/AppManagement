const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/productosCotroller');

// Ruta para obtener todos los productos
router.get('/', obtenerProductos);

// Ruta para obtener un producto por su ID
router.get('/:id', obtenerProductoPorId);

// Ruta para crear un nuevo producto con validaciones
router.post(
  '/',
  [
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('descripcion').not().isEmpty().withMessage('La descripción es obligatoria'),
    check('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    check('stock').isInt({ min: 0 }).withMessage('El stock no puede ser negativo'),
    check('categoria_id').isInt().withMessage('Debe ser una categoría válida')
  ],
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next(); // Si no hay errores, pasa al controlador
  },
  crearProducto
);

// Ruta para actualizar un producto con validaciones
router.put(
  '/:id',
  [
    check('nombre').optional().not().isEmpty().withMessage('El nombre no puede estar vacío'),
    check('descripcion').optional().not().isEmpty().withMessage('La descripción no puede estar vacía'),
    check('precio').optional().isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    check('stock').optional().isInt({ min: 0 }).withMessage('El stock no puede ser negativo'),
    check('categoria_id').optional().isInt().withMessage('Debe ser una categoría válida')
  ],
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next(); // Si no hay errores, pasa al controlador
  },
  actualizarProducto
);

// Ruta para eliminar un producto
router.delete('/:id', eliminarProducto);

module.exports = router;
