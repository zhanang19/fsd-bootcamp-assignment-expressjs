"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sub_chapter extends Model {
    static associate(models) {
      sub_chapter.belongsTo(models.chapter, {
        foreignKey: "chapter_id",
        as: "chapter",
      });
      sub_chapter.hasMany(models.material, {
        foreignKey: "sub_chapter_id",
        as: "materials",
      });
    }
  }
  sub_chapter.init(
    {
      chapter_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "chapters",
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
      is_free: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "sub_chapter",
      tableName: "sub_chapters",
      underscored: true,
      timestamps: true,
    }
  );
  return sub_chapter;
};
