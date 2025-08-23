// Migration to create the Expenses table
module.exports = {
  // This function runs when you migrate up (creates the table)
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,   // Auto-incrementing primary key
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.FLOAT, // Expense amount
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING, // Expense category
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY, // Date of expense
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,   // Optional note
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,     // Timestamp (auto-managed)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,     // Timestamp (auto-managed)
      },
    });
  },
  // This function runs when you migrate down (drops the table)
  down: async (queryInterface) => {
    await queryInterface.dropTable('Expenses');
  },
};
