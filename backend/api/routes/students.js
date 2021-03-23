const express = require("express");
const router = express.Router();
const mysql = require("../database/index");

router.get("/", async (req, res, next) => {
  try {
    const query = "SELECT * FROM students";
    const result = await mysql.execute(query);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const query =
      "INSERT INTO students (name, email, ra, cpf) VALUES (?, ?, ?, ?)";
    const result = await mysql.execute(query, [
      req.body.name,
      req.body.email,
      req.body.ra,
      req.body.cpf,
    ]);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const query = "UPDATE students SET name = ?, email = ? WHERE ra = ?";
    const result = await mysql.execute(query, [
      req.body.name,
      req.body.email,
      req.body.ra,
    ]);
    return res.status(202).send(result);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const query = `DELETE FROM students WHERE ra = ?`;
    const result = await mysql.execute(query, [req.body.ra]);
    return res.status(202).send(result);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

module.exports = router;
