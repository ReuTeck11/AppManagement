const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

// Rutas para los reportes
router.get('/ventas-productos', reportesController.getVentasProductos);  // Reporte de ventas por producto
router.get('/ventas-usuarios', reportesController.getVentasUsuarios);    // Reporte de ventas por usuario
router.get('/ingresos-mensuales', reportesController.getIngresosMensuales);  // Reporte de ingresos por mes

module.exports = router;
