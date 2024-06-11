"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classroom_learning_mode extends Model {
    static associate(models) {
      classroom_learning_mode.belongsTo(models.classroom, {
        foreignKey: "classroom_id",
      });
      classroom_learning_mode.belongsTo(models.learning_mode, {
          foreignKey: "learning_mode_id",
      });
    }
  }
  classroom_learning_mode.init(
    {
      classroom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "classrooms",
          key: "id",
        },
      },
      learning_mode_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "learning_modes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "classroom_learning_mode",
      tableName: "classroom_learning_modes",
      underscored: true,
      timestamps: true,
    }
  );
  return classroom_learning_mode;
};
