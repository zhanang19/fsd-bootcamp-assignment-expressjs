const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middlewares/auth");
const { index, attempt } = require("../controllers/material.controller");

router.get("/", verifyToken, index);
router.post("/attempt", verifyToken, attempt);

module.exports = router;
