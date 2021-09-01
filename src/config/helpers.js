const helpers = {};

helpers.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};

helpers.isAdmin = (req, res, next) => {
  if (req.user.Tipo == 3) {
    return next();
  }
  return res.redirect("/");
};

helpers.isOwner = (req, res, next) => {
  if (req.user.Tipo == 2) {
    return next();
  }
  return res.redirect("/");
};

module.exports = helpers;
