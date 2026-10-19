const express = require("express");
const app = express();
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");

dotenv.config();
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorMiddleware);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
