const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/estacionamiento", (req, res) => {
  res.render("estacionamiento");
});

router.post("/estacionamiento/registrar", (req, res) => {
  let estacionamientos = require("../data/estacionamientos.json");
  let id;

  console.log(req.body);

  if (estacionamientos.estacionamientos.length == 0) {
    id = 1;
  } else {
    id =
      estacionamientos.estacionamientos[
        estacionamientos.estacionamientos.length - 1
      ].id + 1;
  }

  let newEstacionamiento = {
    id: id,
    lugares: req.body.lugares,
    lugaresocupados: 0,
    direccion: req.body.direccion,
  };
  estacionamientos.estacionamientos.push(newEstacionamiento);
  fs.writeFile(
    path.join(__dirname, "..", "data", "estacionamientos.json"),
    JSON.stringify(estacionamientos),
    "utf-8",
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );

  res.redirect("/");
});

module.exports = router;
