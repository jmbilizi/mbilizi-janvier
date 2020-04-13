// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbr = require("express-handlebars");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up handlebars
app.engine("handlebars", exphbr({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controlers/controler.js");
app.use(routes);
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
