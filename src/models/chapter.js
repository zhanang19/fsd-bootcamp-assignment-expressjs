"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chapter extends Model {
    static associate(models) {
      chapter.belongsTo(models.subject, {
        foreignKey: "subject_id",
        as: "subject",
      });
      chapter.hasMany(models.sub_chapter, {
        foreignKey: "chapter_id",
        as: "sub_chapters",
      });
    }
  }
  chapter.init(
    {
      subject_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "subjects",
          key: "id",
        },
        allowNull: false,
      },
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
      modelName: "chapter",
      tableName: "chapters",
      underscored: true,
      timestamps: true,
    }
  );
  return chapter;
};
