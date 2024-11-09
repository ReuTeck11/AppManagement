const pool = require('../config/db');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT * FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
        if (usuario.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(usuario[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error });
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    const { nombre, email, password, rol_id } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)', 
            [nombre, email, password, rol_id]);
        res.json({ id: result.insertId, message: 'Usuario creado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol_id, activo } = req.body;
    try {
        await pool.query('UPDATE usuarios SET nombre = ?, email = ?, rol_id = ?, activo = ? WHERE id_usuario = ?', 
            [nombre, email, rol_id, activo, id]);
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
};
