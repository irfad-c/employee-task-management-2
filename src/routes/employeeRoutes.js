const express = require("express");
const createEmployee = require("../controllers/employeeController.js");
const validateEmployee = require("../validators/validateEmployee.js");
const handleValidationErrors = require("../middlewares/validatorMiddleware.js");

const router = express.Router();

router.post("/", validateEmployee, handleValidationErrors, createEmployee);

module.exports = router;
