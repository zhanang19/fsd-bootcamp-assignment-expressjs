const { classroom: ClassroomModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const index = async (req, res, next) => {
  const classrooms = await ClassroomModel.findAll({
    attributes: ["id", "name"],
    include: [
      {
        association: "learning_modes",
        attributes: ["id", "name"],
      },
    ],
  });

  return res.send({
    message: "Success",
    data: classrooms.map((classroom) => ({
      id: classroom.id,
      name: classroom.name,
      learning_modes: classroom.learning_modes.map((learningMode) => ({
        id: learningMode.id,
        name: learningMode.name,
      })),
    })),
  });
};

module.exports = { index };
