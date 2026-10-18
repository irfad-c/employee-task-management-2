const express = require("express");

const { createTask, updateTask } = require("../controllers/taskController.js");

const router = express.Router();

router.post("/", createTask);
router.patch("/:id/status", updateTask);

module.exports = router;
