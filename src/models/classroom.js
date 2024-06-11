"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classroom extends Model {
    static associate(models) {
      classroom.belongsToMany(models.learning_mode, {
        through: models.classroom_learning_mode,
        foreignKey: "classroom_id",
        as: "learning_modes",
      });
    }
  }
  classroom.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "classroom",
      tableName: "classrooms",
      underscored: true,
    }
  );
  return classroom;
};
