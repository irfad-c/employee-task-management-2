const {
  createTaskService,
  updateTaskService,
  getTaskSummaryService,
} = require("../services/taskServices");

async function createTask(req, res, next) {
  const { employee_id, title, status, priority, due_date } = req.body;

  try {
    await createTaskService(employee_id, title, status, priority, due_date);
    res.status(201).json({ message: "New task created successfully." });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const { status } = req.body;
    const { id } = req.params;
    await updateTaskService(id, status);
    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    next(error);
  }
}

async function getTaskSummary(req, res, next) {
  try {
    const data = await getTaskSummaryService();
    console.log("This is data.", data);

    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: data });
  } catch (error) {
    next(error);
  }
}

module.exports = { createTask, updateTask, getTaskSummary };
