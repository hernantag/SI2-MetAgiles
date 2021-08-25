const express = require("express");
const path = require("path");

app = express();

//Configuraciones
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Router(Rutas)
app.use(require("./routes/index.js"));

//Archivos estaticos
app.use(express.static(__dirname + "/public"));

//Arrancar el server
app.listen(process.env.PORT || 3000, () => {
  console.log("Esta andando");
});
