const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { index, show } = require("../controllers/chapter.controller");

router.get("/", verifyToken, index);
router.get("/:chapter_id", verifyToken, show);

module.exports = router;
