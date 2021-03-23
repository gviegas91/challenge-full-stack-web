const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const app = express();
const studentsRoute = require("./api/routes/students");

// app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  app.use(cors());
  next();
});
app.use("/students", studentsRoute);

module.exports = app;
