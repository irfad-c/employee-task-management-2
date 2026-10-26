const pool = require("../config/db");

async function createTaskServices(
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

module.exports = createTaskServices;
