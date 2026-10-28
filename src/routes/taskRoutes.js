const express = require("express");
const {
  createTask,
  updateTask,
  getTaskSummary,
} = require("../controllers/taskController.js");
const validateTask = require("../validators/validateTask.js");
const handleValidationErrors = require("../middlewares/validatorMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateTask,
  handleValidationErrors,
  createTask,
);
router.patch("/:id/status", authMiddleware, updateTask);
router.get("/summary", getTaskSummary);

module.exports = router;
