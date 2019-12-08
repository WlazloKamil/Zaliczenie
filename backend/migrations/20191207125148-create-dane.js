'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('danes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelkomp: {
        type: Sequelize.STRING
      },
      modelproc: {
        type: Sequelize.STRING
      },
      speedavg: {
        type: Sequelize.INTEGER
      },
      memtotal: {
        type: Sequelize.INTEGER
      },
      memfree: {
        type: Sequelize.INTEGER
      },
      memused: {
        type: Sequelize.INTEGER
      },
      battery: {
        type: Sequelize.INTEGER
      },
      disk1: {
        type: Sequelize.INTEGER
      },
      disk2: {
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('danes');
  }
};