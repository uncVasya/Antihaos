const games = require('../testData/games');
const tournaments = require('../testData/tournaments');
const getUsers = require('../testData/users');
const tourGames = require('../testData/tourGames');
const queues = require('../testData/queues');
const duoreg = require('../testData/duoreg');
const soloreg = require('../testData/soloreg');
const queueType = require('../testData/queueType');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = await getUsers();
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Games', games, {});
    await queryInterface.bulkInsert('Tournaments', tournaments, {});
    await queryInterface.bulkInsert('TourGames', tourGames, {});
    await queryInterface.bulkInsert('Queues', queues, {});
    await queryInterface.bulkInsert('DuoTourRegs', duoreg, {});
    await queryInterface.bulkInsert('SoloTourRegs', soloreg, {});
    await queryInterface.bulkInsert('QueueTypes', queueType, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
