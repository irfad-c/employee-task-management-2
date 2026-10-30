const { body } = require("express-validator");

const taskValidationRules = [
  body("employee_id")
    .notEmpty()
    .withMessage("Employee_id is required.")
    .isNumeric()
    .withMessage("Employee_id must be a number."),
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["TODO", "IN_PROGRESS"])
    .withMessage("Status must be TODO/IN_PROGRESS."),
  body("priority")
    .notEmpty()
    .withMessage("Priority is required.")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Priority must be LOW/MEDIUM/HIGH"),
  body("due_date")
    .notEmpty()
    .withMessage("Due date is required")
    .isDate()
    .withMessage("Due_date must be a date in the format YYYY-MM-DD")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Due date must be in the future.");
      }
      return true;
    }),
];

module.exports = taskValidationRules;
