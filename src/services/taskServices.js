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

async function getTaskSummaryService() {
  const [rows] = await pool.query(
    `SELECT e.name AS employee,e.department,
    
    COUNT(CASE WHEN t.status!='COMPLETED' THEN 1 END)AS pending_tasks,
    COUNT(CASE WHEN t.due_date<CURDATE() AND t.status!='COMPLETED' THEN 1 END)AS overdue_tasks,
    CASE WHEN MAX(CASE WHEN t.status!='COMPLETED' AND t.priority='HIGH' THEN 3 ELSE 0 END)=3 THEN 'HIGH'
         WHEN MAX(CASE WHEN t.status!='COMPLETED' AND t.priority='MEDIUM' THEN 2 ELSE 0 END)=2 THEN 'MEDIUM'
         WHEN MAX(CASE WHEN t.status!='COMPLETED' AND t.priority='LOW' THEN 1 ELSE 0 END)=1 THEN 'LOW'
    ELSE NULL END
    AS highest_priority
    
    FROM employees e INNER JOIN tasks t ON

    e.id=t.employee_id

    GROUP BY e.id,e.name,e.department

    HAVING pending_tasks>0

    ORDER BY overdue_tasks DESC
    
    `,
  );
  return rows;
}

module.exports = {
  createTaskService,
  updateTaskService,
  getTaskSummaryService,
};
