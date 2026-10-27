const express = require("express");

const {
  createTask,
  updateTask,
  getTaskSummary,
} = require("../controllers/taskController.js");
const validateTask = require("../validators/validateTask.js");
const handleValidationErrors = require("../middlewares/validatorMiddleware.js");

const router = express.Router();

router.post("/", validateTask, handleValidationErrors, createTask);
router.patch("/:id/status", updateTask);
router.get("/summary", getTaskSummary);

module.exports = router;
