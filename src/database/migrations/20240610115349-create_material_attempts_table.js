"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("material_attempts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "subjects",
          key: "id",
        },
        allowNull: false,
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "chapters",
          key: "id",
        },
        allowNull: false,
      },
      sub_chapter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sub_chapters",
          key: "id",
        },
        allowNull: false,
      },
      material_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "materials",
          key: "id",
        },
        allowNull: false,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("material_attempts");
  },
};
