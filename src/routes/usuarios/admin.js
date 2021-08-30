const express = require("express");

const router = express.Router();
const pool = require("../../db/db");

const { isAdmin, isLoggedIn } = require("../../config/helpers");

router.get("/admin", isLoggedIn, isAdmin, async (req, res, next) => {
  let dueños = await pool.query(
    "SELECT Id_usuario, Apellido, Nombre, DNI, Correo, Celular FROM usuario WHERE Tipo = 2"
  );
  res.render("admin", { dueños });
});

router.post("/registrar/dueno", isLoggedIn, isAdmin, async (req, res) => {
  let dueño = req.body;
  dueño.Tipo = 2;
  await pool.query("INSERT INTO usuario SET ?", [dueño]);
  res.redirect("/admin");
});

module.exports = router;
