const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const pool = require("../db/db");

const { isAdmin, isLoggedIn } = require("../config/helpers");

router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.Tipo == 3) {
      res.redirect("/admin");
    }
  }
  res.render("index");
});

router.get("/estacionamiento", (req, res) => {
  res.render("estacionamiento");
});

router.get("/regingreso", (req, res) => {
  res.render("regingreso");
});

router.get("/regegreso", (req, res) => {
  res.render("regegreso");
});

router.get("/error", (req, res) => {
  res.render("error");
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

router.post("/estacionamiento/pregingreso", (req, res) => {
  let estacionamientos = require("../data/estacionamientos.json");

  estacionamientos.estacionamientos.forEach((x) => {
    if (x.id == req.body.id) {
      if (x.lugaresocupados < x.lugares) {
        x.lugaresocupados++;
        console.log(x.lugaresocupados);
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
      } else {
        return res.redirect("/error");
      }
      res.redirect("/");
    }
  });
});

router.post("/estacionamiento/pregegreso", (req, res) => {
  let estacionamientos = require("../data/estacionamientos.json");

  estacionamientos.estacionamientos.forEach((x) => {
    if (x.id == req.body.id) {
      if (x.lugaresocupados > 0) {
        x.lugaresocupados--;
        console.log(x.lugaresocupados);
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
      } else {
        return res.redirect("/error");
      }
      res.redirect("/");
    }
  });
});
module.exports = router;
