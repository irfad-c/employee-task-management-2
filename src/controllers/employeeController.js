const {
  calculateWorkloadService,
  createEmployeeService,
} = require("../services/employeeService");

async function createEmployee(req, res, next) {
  try {
    const { name, email, department, salary } = req.body;
    await createEmployeeService(name, email, department, salary);
    return res.status(201).json({ message: "Employee created successfully." });
  } catch (error) {
    next(error);
  }
}

async function calculateWorkload(req, res, next) {
  try {
    const { id } = req.params;
    const result = await calculateWorkloadService(id);
    return res
      .status(200)
      .json({ messsage: "Task details fetched successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {createEmployee,calculateWorkload};
