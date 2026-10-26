const express = require("express");
const {
  createEmployee,
  calculateWorkload,
} = require("../controllers/employeeController.js");
const validateEmployee = require("../validators/validateEmployee.js");
const handleValidationErrors = require("../middlewares/validatorMiddleware.js");

const router = express.Router();

router.post("/", validateEmployee, handleValidationErrors, createEmployee);
router.get("/:id/workload", calculateWorkload);

module.exports = router;
