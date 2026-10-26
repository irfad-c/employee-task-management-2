const createTaskService = require("../services/taskServices");

async function createTask(req, res, next) {
  const { employee_id, title, status, priority, due_date } = req.body;

  try {
    await createTaskService(employee_id, title, status, priority, due_date);
    res.status(201).json({ message: "New task created successfully." });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res) {}

module.exports = { createTask, updateTask };
