const express = require("express");
const router = express.Router();
const mysql = require("../database/index");

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query("SELECT * FROM students", (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }

      return res.status(200).send({ response: result, message: "HA" });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    console.log("REQ -> ", req);
    conn.query(
      "INSERT INTO students (name, email, ra, cpf) VALUES (?, ?, ?, ?)",
      [req.body.name, req.body.email, req.body.ra, req.body.cpf],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error, response: null });
        }

        return res
          .status(200)
          .send({ response: result, message: "Aluno cadastrado com sucesso!" });
      }
    );
  });
});

router.patch("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "UPDATE DE STUDENT",
  });
});

router.delete("/", (req, res, next) => {
  res.status(201).send({
    mensagem: "DELETE DE STUDENT",
  });
});

module.exports = router;
