'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("transaction_groups", "installments", Sequelize.INTEGER)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("transaction_groups", "installments")
  }
};
