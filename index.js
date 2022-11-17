const express = require("express");
const { default: helmet } = require("helmet");
const Joi = require("joi");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbConfig = require("./db/config");
// const isUserAdmin = require("./middlewares/admin");
const app = express();

require("./startup/logging");
require("./startup/config");

// To check the application name is fetched based on env from config
console.log(`Application Name: ${config.get("name")}`);
console.log(process.env.NODE_ENV);
console.log(app.get("env"));

//To set the template engines
app.set("view_engine", "pug");
app.set("views", "./views");

// Adding a middleware
app.use(express.json());
// Middleware to parse form encoded request
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static("public"));
// Middleware to secure http request headers
app.use(helmet());
if (
  process.env.NODE_ENV === "development" ||
  app.get("env") === "development"
) {
  //set morgan middleware
  app.use(morgan("tiny"));
  startupDebugger("Application is started");
}

require("./routes/index")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
