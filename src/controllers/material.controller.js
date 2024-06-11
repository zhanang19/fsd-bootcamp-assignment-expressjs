const { where } = require("sequelize");
const {
  material: MaterialModel,
  material_attempt: MaterialAttemptModel,
  sub_chapter: SubChapterModel,
  user: UserModel,
} = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  const userId = req.user.id;
  const { sub_chapter_id } = req.query;

  const sub_chapter = await SubChapterModel.findOne({
    attributes: ["id"],
    where: {
      id: sub_chapter_id || null,
    },
  });
  if (!sub_chapter) {
    return res.status(404).send({
      message: "Not found",
      data: [],
    });
  }

  const materials = await MaterialModel.findAll({
    // attributes: ["id", "name", "thumbnail"],
    where: {
      sub_chapter_id: sub_chapter_id,
    },
    include: [
      {
        required: false,
        association: "material_attempts",
        where: {
          user_id: userId,
        },
      },
    ],
  });

  const user = await UserModel.findOne({
    where: {
      id: userId,
    },
    include: [
      {
        required: false,
        association: "material_attempts",
        where: {
          sub_chapter_id: sub_chapter_id,
        },
      },
    ],
  });

  return res.send({
    message: "Success",
    data: materials.map((material) => ({
      id: material.id,
      name: material.name,
      thumbnail: material.thumbnail,
      is_completed: user.material_attempts.some(
        (attempt) => attempt.material_id === material.id && attempt.is_completed
      ),
    })),
  });
};

const attempt = async (req, res, next) => {
  const userId = req.user.id;
  const { material_id, is_completed } = req.body;

  const material = await MaterialModel.findOne({
    where: {
      id: material_id,
    },
    include: [
      {
        association: "sub_chapter",
        attributes: ["chapter_id"],
        include: [
          {
            association: "chapter",
            attributes: ["subject_id"],
          },
        ],
      },
    ],
  });
  if (!material) {
    return res.status(404).send({
      message: "Not found",
      data: [],
    });
  }

  const [materialAttempt, is_created] = await MaterialAttemptModel.findOrCreate({
    where: {
      user_id: userId,
      material_id: material_id,
    },
    defaults: {
      subject_id: material.sub_chapter.chapter.subject_id,
      chapter_id: material.sub_chapter.chapter_id,
      sub_chapter_id: material.sub_chapter_id,
      is_completed: is_completed,
    }
  });

  // Material has been attempted before and completed
  if (!is_created && materialAttempt.is_completed) {
    return res.status(400).send({
      message: "Material already completed",
      data: [],
    });
  }

  // Material has been attempted before but not completed yet
  if (!is_created && is_completed && !materialAttempt.is_completed) {
    // Update attempt completion status
    materialAttempt.is_completed = is_completed;
    await materialAttempt.save();

    // Update user's XP & gold
    await UserModel.increment(
      {
        xp_amount: material.xp_on_completion,
        gold_amount: material.gold_on_completion,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  return res.send({
    message: "Success",
    data: {
      id: materialAttempt.id,
      is_completed: materialAttempt.is_completed,
    },
  });
};

module.exports = { index, attempt };
