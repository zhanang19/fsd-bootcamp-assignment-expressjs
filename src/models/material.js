"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class material extends Model {
    static associate(models) {
      material.belongsTo(models.sub_chapter, {
        foreignKey: "sub_chapter_id",
        as: "sub_chapter",
      });
      material.hasMany(models.material_attempt, {
        foreignKey: "material_id",
        as: "material_attempts",
      });
    }
  }
  material.init(
    {
      sub_chapter_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "sub_chapters",
          key: "id",
        },
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM,
        values: ["VIDEO", "SINGLE_QUIZ", "END_QUIZ", "SUMMARY"],
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
      xp_on_completion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      gold_on_completion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "material",
      tableName: "materials",
      underscored: true,
      timestamps: true,
    }
  );
  return material;
};
