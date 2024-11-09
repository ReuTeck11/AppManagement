const pool = require('../config/db');

// Reporte de ventas por producto
exports.getVentasProductos = async (req, res) => {
    try {
        const [reporte] = await pool.query('SELECT * FROM reporte_ventas_productos');
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reporte de ventas por producto', error });
    }
};

// Reporte de ventas por usuario
exports.getVentasUsuarios = async (req, res) => {
    try {
        const [reporte] = await pool.query('SELECT * FROM reporte_ventas_usuarios');
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reporte de ventas por usuario', error });
    }
};

// Reporte de ingresos por mes
exports.getIngresosMensuales = async (req, res) => {
    try {
        const [reporte] = await pool.query('SELECT * FROM reporte_ingresos_mensuales');
        res.json(reporte);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reporte de ingresos mensuales', error });
    }
};
