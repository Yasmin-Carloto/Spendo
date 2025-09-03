'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('transactions', 'groupId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'transaction_groups',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addIndex('transactions', ['groupId'])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('transactions', 'groupId')
    await queryInterface.removeIndex('transactions', ['groupId'])
  }
};
