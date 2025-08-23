
// Import Sequelize ORM
const { Sequelize } = require('sequelize');

// Create Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database user
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST || 'localhost', // DB host
    dialect: 'postgres',                      // Use Postgres
    port: process.env.DB_PORT || 5432,        // DB port
    logging: false,                           // Disable SQL logging
  }
);

// Export the Sequelize instance for use in models
module.exports = sequelize;
