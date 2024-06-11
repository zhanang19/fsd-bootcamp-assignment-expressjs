const {
  subject: SubjectModel,
  classroom_learning_mode: ClassroomLearningModeModel,
} = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  const { classroom_id, learning_mode_id } = req.query;

  const classroom_learning_mode = await ClassroomLearningModeModel.findOne({
    attributes: ["id"],
    where: {
      classroom_id: classroom_id || null,
      learning_mode_id: learning_mode_id || null,
    },
  });
  if (!classroom_learning_mode) {
    return res.status(404).send({
      message: "Not found",
      data: [],
    });
  }

  const subjects = await SubjectModel.findAll({
    attributes: ["id", "name", "thumbnail"],
    where: {
      classroom_id,
      learning_mode_id,
    },
    include: [
      {
        association: "classroom",
        attributes: ["name"],
      },
      {
        association: "learning_mode",
        attributes: ["name"],
      },
    ],
  });

  return res.send({
    message: "Success",
    data: subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      thumbnail: subject.thumbnail,
      classroom_name: subject.classroom.name,
      learning_mode_name: subject.learning_mode.name,
    })),
  });
};

module.exports = { index };
