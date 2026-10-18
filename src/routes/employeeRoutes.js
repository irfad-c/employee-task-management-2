const express = require("express");
const createEmployee = require("../controllers/employeeController.js");

const router = express.Router();

router.post("/", createEmployee);

module.exports = router;
