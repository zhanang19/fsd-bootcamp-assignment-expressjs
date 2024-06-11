"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class material_attempt extends Model {
    static associate(models) {
      material_attempt.belongsTo(models.subject, {
        foreignKey: "subject_id",
        as: "subject",
      });
      material_attempt.belongsTo(models.chapter, {
        foreignKey: "chapter_id",
        as: "chapter",
      });
      material_attempt.belongsTo(models.sub_chapter, {
        foreignKey: "sub_chapter_id",
        as: "sub_chapter",
      });
      material_attempt.belongsTo(models.material, {
        foreignKey: "material_id",
        as: "material",
      });
      material_attempt.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  material_attempt.init(
    {
      subject_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "subjects",
          key: "id",
        },
        allowNull: false,
      },
      chapter_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "chapters",
          key: "id",
        },
        allowNull: false,
      },
      sub_chapter_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "sub_chapters",
          key: "id",
        },
        allowNull: false,
      },
      material_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "materials",
          key: "id",
        },
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "material_attempt",
      tableName: "material_attempts",
      underscored: true,
      timestamps: true,
    }
  );
  return material_attempt;
};
