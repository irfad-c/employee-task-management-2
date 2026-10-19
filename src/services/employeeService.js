const pool = require("../config/db");

async function createEmployeeService(name, email, department, salary) {
  const [data] = await pool.query(`SELECT * FROM employees where email=?`, [
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

module.exports = createEmployeeService;
