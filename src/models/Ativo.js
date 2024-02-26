// models/Cotacao.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../orm/sequelize');

class Ativo extends Model {}

Ativo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Ativo', // We need to choose the model name
  tableName: 'ativos',
  timestamps: false,
});

(async () => {
  await Ativo.sync();
})()

module.exports = Ativo;
