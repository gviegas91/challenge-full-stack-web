const express = require("express");
const morgan = require("morgan");
const app = express();
const studentsRoute = require("./api/routes/students");

app.use(morgan("dev"));
app.use(express.json());
app.use("/students", studentsRoute);

module.exports = app;
