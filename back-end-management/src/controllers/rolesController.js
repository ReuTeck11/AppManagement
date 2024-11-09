const pool = require('../config/db');

// Obtener todos los roles
exports.getRoles = async (req, res) => {
    try {
        const [roles] = await pool.query('SELECT * FROM roles');
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener roles', error });
    }
};

// Crear un nuevo rol
exports.createRole = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO roles (nombre, descripcion) VALUES (?, ?)', 
            [nombre, descripcion]);
        res.json({ id: result.insertId, message: 'Rol creado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear rol', error });
    }
};

// Actualizar un rol
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        await pool.query('UPDATE roles SET nombre = ?, descripcion = ? WHERE id_rol = ?', 
            [nombre, descripcion, id]);
        res.json({ message: 'Rol actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar rol', error });
    }
};

// Eliminar un rol
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM roles WHERE id_rol = ?', [id]);
        res.json({ message: 'Rol eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar rol', error });
    }
};
