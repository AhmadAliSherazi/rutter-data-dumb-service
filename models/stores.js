const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/dbConnection');

const Stores = sequelize.define('Stores', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    default_currency: {
      type: DataTypes.STRING,
    },
    store_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'stores',
    underscored: true,
    timestamps: false,
    schema: 'effector_ecommerce',
  });

module.exports = Stores;