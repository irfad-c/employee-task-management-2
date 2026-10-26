const pool = require("../config/db");

async function createEmployeeService(name, email, department, salary) {
  const [data] = await pool.query(`SELECT id FROM employees where email=?`, [
    email,
  ]);

  if (data.length > 0) {
    const error = new Error("Email already exist.");
    error.statusCode = 400;
    throw error;
  } else {
    await pool.query(
      `INSERT INTO employees (name,email,department,salary) VALUES(?,?,?,?)`,
      [name, email, department, salary],
    );
  }
}

async function calculateWorkloadService(id) {
  const [row] = await pool.query("SELECT id FROM employees WHERE id=?", [id]);
  if (row.length === 0) {
    const error = new Error("Employee not found.");
    error.statusCode = 404;
    throw error;
  }

  const [data] = await pool.query(
    `SELECT COUNT(*)AS total_tasks,
  COUNT(CASE WHEN status!='COMPLETED' THEN 1 END)AS pending_tasks,
  COUNT(CASE WHEN status='COMPLETED' THEN 1 END)AS completed_tasks,
  COUNT(CASE WHEN status!='COMPLETED' AND priority='HIGH' THEN 1 END)AS high_priority_pending,
  COUNT(CASE WHEN due_date<CURDATE() AND status!='COMPLETED' THEN 1 END)AS overdue_tasks
  FROM tasks
  WHERE employee_id=?
  `,
    [id],
  );

  return {
    employee_id: Number(id),
    ...data[0],
  };
}

module.exports = { createEmployeeService, calculateWorkloadService };
