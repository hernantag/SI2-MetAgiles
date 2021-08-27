const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/db");

passport.serializeUser((user, done) => {
  return done(null, user.Id_usuario);
});

passport.deserializeUser(async (id, done) => {
  const fila = await pool.query("SELECT * FROM usuario WHERE Id_usuario = ?", [
    id,
  ]);
  return done(null, fila[0]);
});

passport.use(
  "local-registrar",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, correo, contraseña, done) => {
      console.log(req.body);
      const verificarExistencia = await pool.query(
        "SELECT * FROM usuario WHERE Correo = ?",
        [correo]
      );
      console.log(verificarExistencia);
      if (verificarExistencia.length > 0) {
        return done(
          null,
          false,
          req.flash("El usuario ya se encuentra registrado.")
        );
      }

      const { apellido, dni, nombre, celular } = req.body;
      let nuevoUsuario = {
        apellido,
        nombre,
        dni,
        correo,
        contraseña,
        tipo: 1,
        celular,
      };

      const resultado = await pool.query("INSERT INTO usuario SET ?", [
        nuevoUsuario,
      ]);

      nuevoUsuario.Id_usuario = resultado.insertId;
      return done(null, nuevoUsuario);
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, correo, contraseña, done) => {
      const fila = await pool.query("SELECT * FROM usuario WHERE Correo = ?", [
        correo,
      ]);

      console.log(fila.length);

      if (fila.length === 0) {
        return done(null, false, req.flash("No existe el usuario."));
      }

      const verificarUsuario = fila[0];
      console.log(verificarUsuario);

      if (verificarUsuario.Contraseña != contraseña) {
        return done(null, false, req.flash("Contraseña Incorrecta."));
      }

      return done(null, verificarUsuario);
    }
  )
);
