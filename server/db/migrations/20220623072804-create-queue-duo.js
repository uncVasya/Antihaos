module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QueueDuos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pair_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pairs',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QueueDuos');
  },
};
