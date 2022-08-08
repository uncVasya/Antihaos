module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nickName: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      pass: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      solorank: {
        type: Sequelize.INTEGER,
      },
      duorank: {
        type: Sequelize.INTEGER,
      },
      solowon: {
        type: Sequelize.INTEGER,
      },
      sololost: {
        type: Sequelize.INTEGER,
      },
      duowon: {
        type: Sequelize.INTEGER,
      },
      duolost: {
        type: Sequelize.INTEGER,
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      ban: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Users');
  },
};
