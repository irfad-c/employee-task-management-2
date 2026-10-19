const { body } = require("express-validator");

const employeeValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please type correct email"),
  body("department").notEmpty().withMessage("Department is required"),
  body("salary")
    .notEmpty()
    .withMessage("Salary is required")
    .isNumeric()
    .withMessage("Salary must be an numeric value"),
];

module.exports = employeeValidationRules;
