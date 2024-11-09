const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // La conexión configurada

const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  monto_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', // Debe coincidir con el nombre de la tabla de productos
      key: 'id'
    }
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes', // Debe coincidir con el nombre de la tabla de clientes
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'ventas', // Asegúrate de que coincida con el nombre real de tu tabla en la base de datos
  timestamps: false // Si no tienes campos de createdAt y updatedAt
});

module.exports = Venta;
