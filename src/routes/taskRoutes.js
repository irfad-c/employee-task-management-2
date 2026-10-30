const express = require("express");
const {
  createTask,
  updateTask,
  getTaskSummary,
} = require("../controllers/taskController.js");
const {
  taskValidationRules,
  taskStatusValidationRules,
} = require("../validators/validateTask.js");
const handleValidationErrors = require("../middlewares/validatorMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  taskValidationRules,
  handleValidationErrors,
  createTask,
);
router.patch(
  "/:id/status",
  authMiddleware,
  taskStatusValidationRules,
  handleValidationErrors,
  updateTask,
);
router.get("/summary", getTaskSummary);

module.exports = router;
