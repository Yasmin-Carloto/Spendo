'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("transactions", "installments", Sequelize.INTEGER)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("transactions", "installments")
  }
};
