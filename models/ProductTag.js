const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      uniqueFlag: false,
      references: {
        model: 'product',
        key: 'id',
        unique: false,
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      uniqueFlag: false,
      references: {
        model: 'tag',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    //   moved to be globally defined (connection.js)
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
