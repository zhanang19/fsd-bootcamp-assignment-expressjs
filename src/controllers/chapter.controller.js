const {
  chapter: ChapterModel,
  subject: SubjectModel,
  user: UserModel,
} = require("../models");
const material = require("../models/material");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  const userId = req.user.id;
  const { subject_id } = req.query;

  const subject = await SubjectModel.findOne({
    attributes: ["name"],
    where: { id: subject_id || null },
  });
  if (!subject) {
    return res.status(404).send({
      message: "Not found",
      data: [],
    });
  }

  const chapters = await ChapterModel.findAll({
    // include sub chapters count
    attributes: [
      "id",
      "name",
      "thumbnail",
      [
        ChapterModel.sequelize.literal(`
          (SELECT COUNT(1) FROM sub_chapters s
            WHERE s.chapter_id = chapter.id AND s.is_free = true)
        `),
        "free_sub_chapters_count",
      ],
      [
        ChapterModel.sequelize.literal(`
          (SELECT COUNT(1) FROM materials m
            JOIN sub_chapters s ON s.id = m.sub_chapter_id
            WHERE s.id = chapter.id)
        `),
        "materials_count",
      ],
    ],
    where: { subject_id },
  });

  const user = await UserModel.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        association: "material_attempts",
        where: { subject_id },
      },
    ],
  });

  return res.send({
    message: "Success",
    data: chapters.map(function (chapter) {
      const completedMaterialsCount = user.material_attempts.filter(
        (materialAttempt) =>
          materialAttempt.chapter_id === chapter.id &&
          materialAttempt.is_completed
      ).length;

      return {
        id: chapter.id,
        name: chapter.name,
        thumbnail: chapter.thumbnail,
        materials_count: chapter.get("materials_count"),
        completed_materials_count: completedMaterialsCount,
        completion_percentage:
          (completedMaterialsCount / chapter.get("materials_count")) * 100,
        free_sub_chapters_count: chapter.get("free_sub_chapters_count"),
        subject_name: subject.name,
      };
    }),
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const show = async (req, res, next) => {
  const userId = req.user.id;
  const { chapter_id } = req.params;

  const chapter = await ChapterModel.findOne({
    attributes: [
      "id",
      "subject_id",
      "name",
      "thumbnail",
      [
        ChapterModel.sequelize.literal(`
          (SELECT COUNT(1) FROM sub_chapters s
            WHERE s.chapter_id = chapter.id AND s.is_free = true)
        `),
        "free_sub_chapters_count",
      ],
    ],
    where: { id: chapter_id || null },
    include: [
      {
        association: "sub_chapters",
        attributes: [
          "id",
          "name",
          "thumbnail",
          "is_free",
          [
            ChapterModel.sequelize.literal(`
              (SELECT COUNT(1) FROM materials m
                JOIN sub_chapters s ON s.id = m.sub_chapter_id
                WHERE s.id = chapter.id)
            `),
            "materials_count",
          ],
        ],
      },
    ],
  });
  if (!chapter) {
    return res.status(404).send({
      message: "Not found",
      data: [],
    });
  }

  const user = await UserModel.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        association: "material_attempts",
        where: { chapter_id },
      },
    ],
  });

  return res.send({
    message: "Success",
    data: {
      id: chapter.id,
      subject_id: chapter.subject_id,
      name: chapter.name,
      thumbnail: chapter.thumbnail,
      free_sub_chapters_count: chapter.get("free_sub_chapters_count"),
      sub_chapters: chapter.sub_chapters.map(function (subChapter) {
        const completedMaterialsCount = user.material_attempts.filter(
          (attempt) =>
            attempt.sub_chapter_id === subChapter.id && attempt.is_completed
        ).length;

        return {
          id: subChapter.id,
          name: subChapter.name,
          thumbnail: subChapter.thumbnail,
          is_free: subChapter.is_free,
          materials_count: subChapter.get("materials_count"),
          completed_materials_count: completedMaterialsCount,
          completion_percentage:
            (completedMaterialsCount / subChapter.get("materials_count")) * 100,
        };
      }),
    },
  });
};

module.exports = { index, show };
