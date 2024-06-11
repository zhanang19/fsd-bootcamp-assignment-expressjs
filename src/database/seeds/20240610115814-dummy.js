"use strict";

const { classroom, learning_mode, user } = require("../../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} _Sequelize
   */
  async up(queryInterface, _Sequelize) {
    await learning_mode.destroy({ truncate: { cascade: true } });
    await classroom.destroy({ truncate: { cascade: true } });
    await user.destroy({ truncate: { cascade: true } });

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "John Doe",
        email: "test@example.com",
        password:
          "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", // Qwerty123
      },
    ]);
    await queryInterface.bulkInsert("classrooms", [
      {
        id: 1,
        name: "Kelas 1",
      },
      {
        id: 2,
        name: "Kelas 2",
      },
    ]);
    await queryInterface.bulkInsert("learning_modes", [
      { id: 1, name: "Pembelajaran Tematik" },
      { id: 2, name: "Kurikulum Merdeka" },
    ]);
    await queryInterface.bulkInsert("classroom_learning_modes", [
      { id: 1, classroom_id: 1, learning_mode_id: 1 },
      { id: 2, classroom_id: 1, learning_mode_id: 2 },
      { id: 3, classroom_id: 2, learning_mode_id: 1 },
      { id: 4, classroom_id: 2, learning_mode_id: 2 },
    ]);
    await queryInterface.bulkInsert("subjects", [
      {
        id: 1,
        classroom_id: 1,
        learning_mode_id: 1,
        name: "Matematika",
        thumbnail:
          "https://via.placeholder.com/300?text=Matematika%20%28Tematik%29",
      },
      {
        id: 2,
        classroom_id: 1,
        learning_mode_id: 2,
        name: "IPA",
        thumbnail: "https://via.placeholder.com/300?text=IPA%20%28Tematik%29",
      },
      {
        id: 3,
        classroom_id: 1,
        learning_mode_id: 1,
        name: "Matematika",
        thumbnail:
          "https://via.placeholder.com/300?text=Matematika%20%28Merdeka%20Belajar%29",
      },
      {
        id: 4,
        classroom_id: 1,
        learning_mode_id: 2,
        name: "IPA",
        thumbnail:
          "https://via.placeholder.com/300?text=IPA%20%28Merdeka%20Belajar%29",
      },
      {
        id: 5,
        classroom_id: 2,
        learning_mode_id: 1,
        name: "Matematika",
        thumbnail:
          "https://via.placeholder.com/300?text=Matematika%20%28Tematik%29",
      },
      {
        id: 6,
        classroom_id: 2,
        learning_mode_id: 2,
        name: "IPA",
        thumbnail: "https://via.placeholder.com/300?text=IPA%20%28Tematik%29",
      },
      {
        id: 7,
        classroom_id: 2,
        learning_mode_id: 1,
        name: "Matematika",
        thumbnail:
          "https://via.placeholder.com/300?text=Matematika%20%28Merdeka%20Belajar%29",
      },
      {
        id: 8,
        classroom_id: 2,
        learning_mode_id: 2,
        name: "IPA",
        thumbnail:
          "https://via.placeholder.com/300?text=IPA%20%28Merdeka%20Belajar%29",
      },
    ]);
    await queryInterface.bulkInsert("chapters", [
      {
        id: 1,
        subject_id: 1,
        name: "Pengenalan Angka",
        thumbnail: "https://via.placeholder.com/300?text=Pengenalan%20Angka",
      },
      {
        id: 2,
        subject_id: 2,
        name: "Pengenalan Tumbuhan",
        thumbnail: "https://via.placeholder.com/300?text=Pengenalan%20Tumbuhan",
      },
      {
        id: 3,
        subject_id: 3,
        name: "Pengenalan Angka",
        thumbnail: "https://via.placeholder.com/300?text=Pengenalan%20Angka",
      },
      {
        id: 4,
        subject_id: 4,
        name: "Pengenalan Tumbuhan",
        thumbnail: "https://via.placeholder.com/300?text=Pengenalan%20Tumbuhan",
      },
      {
        id: 5,
        subject_id: 5,
        name: "Aljabar",
        thumbnail: "https://via.placeholder.com/300?text=Aljabar",
      },
      {
        id: 6,
        subject_id: 6,
        name: "Pengenalan Hewan",
        thumbnail: "https://via.placeholder.com/300?text=Pengenalan%20Hewan",
      },
      {
        id: 7,
        subject_id: 7,
        name: "Aljabar",
        thumbnail: "https://via.placeholder.com/300?text=Aljabar",
      },
      {
        id: 8,
        subject_id: 8,
        name: "Pengenalan Hewan",
        thumbnail: "https://via.placeholder.com/300?text=Pengenalan%20Hewan",
      },
    ]);
    await queryInterface.bulkInsert("sub_chapters", [
      {
        id: 1,
        chapter_id: 1,
        name: "Operasi Matematika Dasar",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Matematika%20Dasar",
        is_free: true,
      },
      {
        id: 2,
        chapter_id: 1,
        name: "Operasi Matematika Lanjutan",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Matematika%20Lanjutan",
        is_free: false,
      },
      {
        id: 3,
        chapter_id: 2,
        name: "Anatomi Tumbuhan",
        thumbnail: "https://via.placeholder.com/300?text=Anatomi%20Tumbuhan",
        is_free: true,
      },
      {
        id: 4,
        chapter_id: 2,
        name: "Fotosintesis",
        thumbnail: "https://via.placeholder.com/300?text=Fotosintesis",
        is_free: false,
      },
      {
        id: 5,
        chapter_id: 3,
        name: "Operasi Matematika Dasar",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Matematika%20Dasar",
        is_free: true,
      },
      {
        id: 6,
        chapter_id: 3,
        name: "Operasi Matematika Lanjutan",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Matematika%20Lanjutan",
        is_free: false,
      },
      {
        id: 7,
        chapter_id: 4,
        name: "Anatomi Tumbuhan",
        thumbnail: "https://via.placeholder.com/300?text=Anatomi%20Tumbuhan",
        is_free: true,
      },
      {
        id: 8,
        chapter_id: 4,
        name: "Fotosintesis",
        thumbnail: "https://via.placeholder.com/300?text=Fotosintesis",
        is_free: false,
      },
      {
        id: 9,
        chapter_id: 5,
        name: "Operasi Aljabar Dasar",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Aljabar%20Dasar",
        is_free: true,
      },
      {
        id: 10,
        chapter_id: 5,
        name: "Operasi Aljabar Lanjutan",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Aljabar%20Lanjutan",
        is_free: false,
      },
      {
        id: 11,
        chapter_id: 6,
        name: "Anatomi Hewan",
        thumbnail: "https://via.placeholder.com/300?text=Anatomi%20Hewan",
        is_free: true,
      },
      {
        id: 12,
        chapter_id: 6,
        name: "Sistem Pernafasan Hewan",
        thumbnail:
          "https://via.placeholder.com/300?text=Sistem%20Pernafasan%20Hewan",
        is_free: false,
      },
      {
        id: 13,
        chapter_id: 7,
        name: "Operasi Aljabar Dasar",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Aljabar%20Dasar",
        is_free: true,
      },
      {
        id: 14,
        chapter_id: 7,
        name: "Operasi Aljabar Lanjutan",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Aljabar%20Lanjutan",
        is_free: false,
      },
      {
        id: 15,
        chapter_id: 8,
        name: "Anatomi Hewan",
        thumbnail: "https://via.placeholder.com/300?text=Anatomi%20Hewan",
        is_free: true,
      },
      {
        id: 16,
        chapter_id: 8,
        name: "Sistem Pernafasan Hewan",
        thumbnail:
          "https://via.placeholder.com/300?text=Sistem%20Pernafasan%20Hewan",
        is_free: false,
      },
    ]);
    await queryInterface.bulkInsert("materials", [
      {
        id: 1,
        sub_chapter_id: 1,
        type: "VIDEO",
        name: "Operasi Penjumlahan",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Penjumlahan",
        xp_on_completion: 125,
        gold_on_completion: 10,
      },
      {
        id: 2,
        sub_chapter_id: 1,
        type: "SINGLE_QUIZ",
        name: "Operasi Penjumlahan",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Penjumlahan",
        xp_on_completion: 50,
        gold_on_completion: 50,
      },
      {
        id: 3,
        sub_chapter_id: 1,
        type: "VIDEO",
        name: "Operasi Pengurangan",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Pengurangan",
        xp_on_completion: 125,
        gold_on_completion: 10,
      },
      {
        id: 4,
        sub_chapter_id: 1,
        type: "SINGLE_QUIZ",
        name: "Operasi Pengurangan",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Pengurangan",
        xp_on_completion: 50,
        gold_on_completion: 50,
      },
      {
        id: 5,
        sub_chapter_id: 1,
        type: "END_QUIZ",
        name: "Operasi Penjumlahan & Pengurangan",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Penjumlahan%20%26%20Pengurangan",
        xp_on_completion: 0,
        gold_on_completion: 0,
      },
      {
        id: 6,
        sub_chapter_id: 1,
        type: "SUMMARY",
        name: "Operasi Penjumlahan & Pengurangan",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Penjumlahan%20%26%20Pengurangan",
        xp_on_completion: 0,
        gold_on_completion: 0,
      },
      {
        id: 7,
        sub_chapter_id: 2,
        type: "VIDEO",
        name: "Operasi Perkalian",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Perkalian",
        xp_on_completion: 125,
        gold_on_completion: 10,
      },
      {
        id: 8,
        sub_chapter_id: 2,
        type: "SINGLE_QUIZ",
        name: "Operasi Perkalian",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Perkalian",
        xp_on_completion: 50,
        gold_on_completion: 50,
      },
      {
        id: 9,
        sub_chapter_id: 2,
        type: "VIDEO",
        name: "Operasi Pembagian",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Pembagian",
        xp_on_completion: 125,
        gold_on_completion: 10,
      },
      {
        id: 10,
        sub_chapter_id: 2,
        type: "SINGLE_QUIZ",
        name: "Operasi Pembagian",
        thumbnail: "https://via.placeholder.com/300?text=Operasi%20Pembagian",
        xp_on_completion: 50,
        gold_on_completion: 50,
      },
      {
        id: 11,
        sub_chapter_id: 2,
        type: "END_QUIZ",
        name: "Operasi Perkalian & Pembagian",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Perkalian%20%26%20Pembagian",
        xp_on_completion: 0,
        gold_on_completion: 0,
      },
      {
        id: 12,
        sub_chapter_id: 2,
        type: "SUMMARY",
        name: "Operasi Perkalian & Pembagian",
        thumbnail:
          "https://via.placeholder.com/300?text=Operasi%20Perkalian%20%26%20Pembagian",
        xp_on_completion: 0,
        gold_on_completion: 0,
      },
    ]);
    await queryInterface.bulkInsert("material_attempts", [
      {
        id: 1,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 1,
        material_id: 1,
        is_completed: true,
      },
      {
        id: 2,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 1,
        material_id: 2,
        is_completed: true,
      },
      {
        id: 3,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 1,
        material_id: 3,
        is_completed: true,
      },
      {
        id: 4,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 1,
        material_id: 4,
        is_completed: false,
      },
      {
        id: 5,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 1,
        material_id: 5,
        is_completed: false,
      },
      {
        id: 6,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 1,
        material_id: 6,
        is_completed: false,
      },
      {
        id: 7,
        user_id: 1,
        subject_id: 1,
        chapter_id: 1,
        sub_chapter_id: 2,
        material_id: 7,
        is_completed: true,
      },
    ]);
  },
  /**
   * @param {import('sequelize').QueryInterface} _queryInterface
   * @param {import('sequelize').Sequelize} _Sequelize
   */
  async down(_queryInterface, _Sequelize) {},
};
