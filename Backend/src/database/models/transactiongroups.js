'use strict';
const { Model } = require('sequelize');
const { TRANSACTION_TYPES } = require('../../utils/transaction.types');

module.exports = (sequelize, DataTypes) => {
  class TransactionGroup extends Model {
    static associate(models) {
      TransactionGroup.hasMany(models.Transaction, {
        foreignKey: 'groupId', 
        as: 'transactions',
        onDelete: 'CASCADE',
      });

      TransactionGroup.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })

      TransactionGroup.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  TransactionGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('EXPENSE', 'INCOME'),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      installments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'TransactionGroup',
      tableName: 'transaction_groups',
    }
  );

  return TransactionGroup;
};
