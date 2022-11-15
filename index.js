const express = require("express");
const { default: helmet } = require("helmet");
const Joi = require("joi");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const authors = require("./routes/authors");
const dbConfig = require("./db/config");
const app = express();

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
  console.log("a");
  //set morgan middleware
  app.use(morgan("tiny"));
  startupDebugger("Application is started");
}

app.use((req, res, next) => {
  console.log("Logging in middleware");
  next();
});

app.use("/", home);
app.use("/api/courses", courses);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/authors", authors);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
