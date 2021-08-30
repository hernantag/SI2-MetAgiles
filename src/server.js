const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const cookieParser = require("cookie-parser");
var flash = require("connect-flash");
require("dotenv").config();

app = express();
require("./config/passport");

//Configuraciones
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  session({
    secret: "PolloRoldan",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware setup
app.use(passport.initialize());
app.use(passport.session());

//Router(Rutas)
app.use(require("./routes/index.js"));
app.use(require("./routes/admin/admin.js"));
app.use(require("./routes/autenticacion"));

//Archivos estaticos
app.use(express.static(__dirname + "/public"));

//Arrancar el server
app.listen(process.env.PORT || 3000, () => {
  console.log("Esta andando");
});
