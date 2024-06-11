"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    static associate(models) {
      subject.belongsTo(models.learning_mode, {
        foreignKey: "learning_mode_id",
      });
      subject.belongsTo(models.classroom, {
        foreignKey: "classroom_id",
      });
    }
  }
  subject.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "subject",
      tableName: "subjects",
      underscored: true,
      timestamps: true,
    }
  );
  return subject;
};
