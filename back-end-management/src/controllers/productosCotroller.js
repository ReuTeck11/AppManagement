const pool = require('../config/db');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const [productos] = await pool.query('SELECT * FROM productos');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [producto] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        if (producto.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        const result = await pool.query('INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?)', 
            [nombre, descripcion, precio, stock, categoria_id]);
        res.status(201).json({ message: 'Producto creado', id: result[0].insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        await pool.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ? WHERE id_producto = ?', 
            [nombre, descripcion, precio, stock, categoria_id, id]);
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
