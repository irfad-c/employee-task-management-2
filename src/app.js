const express = require("express");
const app = express();
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");

dotenv.config();
app.use(express.json());

const port = process.env.PORT;
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

app.listen("/", () => {
  console.log(`Server running on ${port}`);
});
