'use strict';
const { Model } = require('sequelize');
const { TRANSACTION_TYPES } = require('../../utils/transaction.types');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Transaction.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })

      Transaction.belongsTo(models.TransactionGroup, {
        foreignKey: 'groupId',
        as: 'group',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Transaction.init({
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true, 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM([TRANSACTION_TYPES.EXPENSE, TRANSACTION_TYPES.INCOME]),
      allowNull: false,
    },
    installments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    installmentNumber: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    groupId: { 
      type: DataTypes.INTEGER, 
      allowNull: true, 
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
  });

  return Transaction;
};
