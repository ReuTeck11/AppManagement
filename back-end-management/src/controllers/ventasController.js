const pool = require('../config/db');

// Obtener todas las ventas
exports.getVentas = async (req, res) => {
    try {
        const [ventas] = await pool.query(`
            SELECT v.id_venta, v.total, v.fecha, u.nombre AS usuario
            FROM ventas v
            JOIN usuarios u ON v.id_usuario = u.id_usuario
        `);
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener ventas', error });
    }
};

// Obtener una venta por ID
exports.getVentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [venta] = await pool.query(`
            SELECT v.id_venta, v.total, v.fecha, u.nombre AS usuario
            FROM ventas v
            JOIN usuarios u ON v.id_usuario = u.id_usuario
            WHERE v.id_venta = ?`, [id]);
        
        if (venta.length === 0) return res.status(404).json({ message: 'Venta no encontrada' });

        // Obtener los productos de la venta
        const [productos] = await pool.query(`
            SELECT p.nombre, vp.cantidad, vp.precio_unitario
            FROM venta_productos vp
            JOIN productos p ON vp.id_producto = p.id_producto
            WHERE vp.id_venta = ?`, [id]);

        res.json({ venta: venta[0], productos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener venta', error });
    }
};

// Crear una nueva venta
exports.createVenta = async (req, res) => {
    const { id_usuario, productos } = req.body;  // Productos es un array [{ id_producto, cantidad, precio_unitario }]
    let total = 0;

    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // Calcular el total
        productos.forEach(prod => {
            total += prod.cantidad * prod.precio_unitario;
        });

        // Insertar la venta
        const [result] = await connection.query('INSERT INTO ventas (id_usuario, total) VALUES (?, ?)', [id_usuario, total]);
        const id_venta = result.insertId;

        // Insertar los productos de la venta
        for (let prod of productos) {
            await connection.query('INSERT INTO venta_productos (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)', 
                [id_venta, prod.id_producto, prod.cantidad, prod.precio_unitario]);
        }

        await connection.commit();
        connection.release();

        res.json({ id_venta, message: 'Venta creada exitosamente' });
    } catch (error) {
        if (connection) await connection.rollback();
        res.status(500).json({ message: 'Error al crear la venta', error });
    }
};
