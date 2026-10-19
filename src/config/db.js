const mysql=require('mysql2/promise')
const dotenv = require("dotenv");
dotenv.config();

const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;

const pool = mysql.createPool({
  database,
  password,
  host,
  user,
});

module.exports = pool;
