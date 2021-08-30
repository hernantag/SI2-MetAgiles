const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("./auth/signup");
});

router.get("/login", (req, res) => {
  res.render("./auth/login");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.post(
  "/signup",
  passport.authenticate("local-registrar", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
