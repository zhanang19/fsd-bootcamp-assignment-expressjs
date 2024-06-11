"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class learning_mode extends Model {
    static associate(models) {
      learning_mode.belongsToMany(models.classroom, {
        through: models.classroom_learning_mode,
        foreignKey: "learning_mode_id",
      });
    }
  }
  learning_mode.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "learning_mode",
      tableName: "learning_modes",
      underscored: true,
      timestamps: true,
    }
  );
  return learning_mode;
};
