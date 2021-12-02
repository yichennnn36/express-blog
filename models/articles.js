'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    static associate(models) {
      Articles.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Articles.belongsTo(models.Categories, {
        foreignKey: 'categoryId'
      })
    }
  };
  Articles.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT,
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};
