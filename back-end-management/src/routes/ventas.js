const { Producto } = require('../models/Producto');
const { Venta, VentaProducto } = require('../models/Venta');
const { validationResult } = require('express-validator');

// Crear una nueva venta
const crearVenta = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { productos } = req.body; // productos será un array [{ id_producto, cantidad }]

    try {
        // Verificar si todos los productos tienen suficiente stock
        for (const item of productos) {
            const producto = await Producto.findByPk(item.id_producto);
            if (!producto) {
                return res.status(404).json({ msg: `Producto con ID ${item.id_producto} no encontrado` });
            }
            if (producto.stock < item.cantidad) {
                return res.status(400).json({ msg: `Stock insuficiente para el producto ${producto.nombre}` });
            }
        }

        // Crear la venta
        const nuevaVenta = await Venta.create({
            total: calcularTotal(productos), // función para calcular el total
            id_usuario: req.usuario.id // supondremos que el usuario ya está autenticado
        });

        // Descontar el stock y registrar los productos de la venta
        for (const item of productos) {
            const producto = await Producto.findByPk(item.id_producto);
            await producto.update({ stock: producto.stock - item.cantidad });
            
            // Registrar en venta_productos
            await VentaProducto.create({
                id_venta: nuevaVenta.id_venta,
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: producto.precio
            });
        }

        res.status(201).json({ msg: 'Venta creada exitosamente', venta: nuevaVenta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al procesar la venta' });
    }
};

// Función para calcular el total de la venta
const calcularTotal = (productos) => {
    return productos.reduce((total, item) => total + (item.cantidad * item.precio_unitario), 0);
};

module.exports = { crearVenta };
