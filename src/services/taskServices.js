const pool = require("../config/db");

async function createTaskService(
  employee_id,
  title,
  status,
  priority,
  due_date,
) {
  const [row1] = await pool.query("SELECT * FROM employees WHERE id=?", [
    employee_id,
  ]);
  if (row1.length === 0) {
    const error = new Error("No employee exist for this employee_id");
    error.statusCode = 404;
    throw error;
  }

  const [row2] = await pool.query(
    "SELECT COUNT(*)AS activeTasks FROM tasks WHERE status!='COMPLETED' AND employee_id=?",
    [employee_id],
  );

  if (row2[0].activeTasks >= 7) {
    const error = new Error("Active task limit reached");
    error.statusCode = 400;
    throw error;
  }

  const data = await pool.query(
    "INSERT INTO tasks (employee_id,title,status,priority,due_date) VALUES(?,?,?,?,?)",
    [employee_id, title, status, priority, due_date],
  );
  return data;
}

async function updateTaskService(id, status) {
  const [rows] = await pool.query("SELECT status FROM tasks WHERE id=?", [id]);
  if (rows.length === 0) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  const currentStatus = rows[0].status;
  if (status === "IN_PROGRESS" && currentStatus === "TODO") {
    await pool.query("UPDATE tasks SET status=? WHERE id=? ", [status, id]);
  } else if (status === "COMPLETED" && currentStatus === "IN_PROGRESS") {
    await pool.query(
      "UPDATE tasks SET status=?, completed_at=CURRENT_TIMESTAMP WHERE id=? ",
      [status, id],
    );
  } else {
    const error = new Error("Status transition declined");
    error.statusCode = 400;
    throw error;
  }
  return true;
}

module.exports = { createTaskService, updateTaskService };
