const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConnection');
const Stores = require('./stores');
const DataSync = sequelize.define('DataSync', {
  store_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: Stores,
      key: 'id',
    },
  },
  access_token: {
    type: DataTypes.STRING,
  },
  platform: {
    type: DataTypes.STRING,
  },
  started_customer: {
    type: DataTypes.DATE,
  },
  sync_customer: {
    type: DataTypes.BOOLEAN,
  },
  started_order: {
    type: DataTypes.DATE,
  },
  sync_order: {
    type: DataTypes.BOOLEAN,
  },
  started_product: {
    type: DataTypes.DATE,
  },
  sync_product: {
    type: DataTypes.BOOLEAN,
  },
  started_overview: {
    type: DataTypes.DATE,
  },
  sync_overview: {
    type: DataTypes.BOOLEAN,
  },
  started_finance: {
    type: DataTypes.DATE,
  },
  sync_finance: {
    type: DataTypes.BOOLEAN,
  },
  connection_id: {
    type: DataTypes.STRING,
  },
  started_product_cal: {
    type: DataTypes.DATE,
  },
  sync_product_cal: {
    type: DataTypes.BOOLEAN,
  },
  started_order_cal: {
    type: DataTypes.DATE,
  },
  sync_order_cal: {
    type: DataTypes.BOOLEAN,
  },
  filter: {
    type: DataTypes.BOOLEAN,
  },
  initial_sync: {
    type: DataTypes.BOOLEAN,
  }
}, {
  tableName: 'data_sync',
  underscored: true,
  timestamps: false,
  schema: 'effector_ecommerce',
});
// DataSync.sync({ alter: true }).then(
//   () => console.log("Sync complete")
// );
module.exports = DataSync;