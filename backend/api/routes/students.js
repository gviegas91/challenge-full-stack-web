const express = require("express");
const router = express.Router();
const mysql = require("../database/index");

router.get("/", async (req, res, next) => {
  try {
    const query = "SELECT * FROM students";
    const response = await mysql.execute(query);
    return res.status(200).send(response);
  } catch (error) {
    const err = {
      ...error,
      message: "Desculpe, ocorreu algum erro crítico ao listar os alunos.",
      status: 500,
    };
    return res.status(500).send(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const query =
      "INSERT INTO students (name, email, ra, cpf) VALUES (?, ?, ?, ?)";
    let response = await mysql.execute(query, [
      req.body.name,
      req.body.email,
      req.body.ra,
      req.body.cpf,
    ]);
    response = {
      ...response,
      message: "Aluno inserido com sucesso!",
      result: {
        name: req.body.name,
        email: req.body.email,
        ra: req.body.ra,
        cpf: req.body.cpf,
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    let message = "Desculpe, ocorreu algum erro crítico ao cadastrar o aluno.";

    if (error.code === "ER_DUP_ENTRY") {
      message =
        "Desculpe, já existe um usuário com esse CPF, Email ou Registro Acadêmico.";
    }

    const err = {
      ...error,
      message: message,
      status: 500,
    };
    return res.status(500).send(err);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const query = "UPDATE students SET name = ?, email = ? WHERE ra = ?";
    let response = await mysql.execute(query, [
      req.body.name,
      req.body.email,
      req.body.ra,
    ]);
    response = {
      ...response,
      message: "Aluno alterado com sucesso!",
      result: {
        name: req.body.name,
        email: req.body.email,
        ra: req.body.ra,
        cpf: req.body.cpf,
      },
    };
    return res.status(202).send(response);
  } catch (error) {
    let message = "Desculpe, ocorreu algum erro crítico ao cadastrar o aluno.";

    if (error.code === "ER_DUP_ENTRY") {
      message = "Desculpe, já existe um usuário com esse Email.";
    }
    const err = {
      ...error,
      message: message,
      status: 500,
    };
    return res.status(500).send(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const query = `DELETE FROM students WHERE id = ?`;
    let response = await mysql.execute(query, [req.body.id]);
    response = {
      ...response,
      message: "Aluno deletado com sucesso!",
      result: {
        name: req.body.name,
        email: req.body.email,
        ra: req.body.ra,
        cpf: req.body.cpf,
      },
    };
    return res.status(202).send(response);
  } catch (error) {
    const err = {
      ...error,
      message: "Desculpe, ocorreu algum erro crítico ao deletar o aluno.",
      status: 500,
    };
    return res.status(500).send(err);
  }
});

module.exports = router;
