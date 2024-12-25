const mongoose = require('mongoose');
const { Sequelize } = require("sequelize");
const logger = require('./logsConf');

// Sequelize connection
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_USER_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: process.env.DATABASE_DIALECT,
  pool: {
    max: 200, // should be 150+ for smoother experience
    min: 0,
    acquire: 120000,
    idle: 10000,
  },
  logging: false,
});

// Initialize Sequelize connection with IIFE
(async () => {
  try {
    await sequelize.authenticate();
    logger.info("Sequelize connection established successfully.");
  } catch (error) {
    logger.error("Unable to connect to Sequelize database:", error);
  }
})();

// Initialize MongoDB connection with IIFE
(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', err => {
      logger.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  }
})();

module.exports = { sequelize };
